/**
 * @file
 * Howard University Special Alerts Feed functionality.
 *
 * This file contains the JavaScript behavior for the Howard Special Alerts Feed
 * module. It handles fetching alerts from thedig.howard.edu, displaying them
 * as dismissible notification bars, and managing user preferences via cookies.
 *
 * The module automatically fetches active alerts on page load and provides
 * dismissal functionality with cookie-based persistence.
 *
 * @version 11.0.2
 * @see howard_special_alerts_feed.module
 * @see assets/css/alerts-feed.css
 */

(function () {
  'use strict';

  /**
   * Special Alerts Feed object.
   *
   * Contains all methods and properties for managing the alerts feed.
   * 
   * @version 11.0.2
   */
  let specialAlertsFeed = {

    /**
     * Module version for debugging and compatibility checks.
     * @type {string}
     */
    version: '11.0.2',

    /**
     * HTML template for individual alert bars.
     *
     * This template is used to create the DOM structure for each alert.
     * It includes placeholders for alert content and dismissal functionality.
     */
    alertBar: `<article id="" class="">
                    <a class="newsroom-alert" href="">
                        <strong></strong>
                    </a>
                    <a class="newsroom-alert-dismiss" data-alert-id="">
                        <span class="hidden">Dismiss alert</span>
                    </a>
                </article>`,

    /**
     * Renders alert data to the page.
     *
     * Takes an array of alert objects and creates HTML elements for each one,
     * populating them with the alert data and appending them to the page.
     *
     * @param {Array} data - Array of alert objects from the API.
     */
    setAlertBars: function (data) {
      let alertBarWrapper = document.getElementById("howard_special_alerts_feed");
      
      // Process each alert in the data array
      data.forEach(alert => {
        let parser = new DOMParser();
        let bar = parser.parseFromString(specialAlertsFeed.alertBar, "text/html");
        let url = alert.env + alert.attributes.path.alias;

        // Use custom link if available, otherwise use the alert page URL
        if (alert.attributes.field_alert_links) {
          url = alert.attributes.field_alert_links.uri;
        }

        // Set alert attributes
        bar.querySelector("article").setAttribute('id', "newsroom-alert-" + alert.id);
        bar.querySelector("article").setAttribute('class', "newsroom-alert--" + alert.id);
        bar.querySelector("article a.newsroom-alert").setAttribute('class', "newsroom-alert newsroom-alert--" + alert.attributes.field_alert_level);
        bar.querySelector("article a.newsroom-alert").setAttribute('href', url);
        bar.querySelector("article a.newsroom-alert strong").innerHTML = alert.attributes.title;
        
        // Add subtitle if available
        if (alert.attributes.field_alert_subtitle) {
          bar.querySelector("article a.newsroom-alert").textContent += " " + alert.attributes.field_alert_subtitle;
        }
        
        // Set dismiss button attributes
        bar.querySelector("article a.newsroom-alert-dismiss").setAttribute("data-alert-id", alert.id);
        bar.querySelector("article a.newsroom-alert-dismiss span").textContent += " " + alert.id;
        
        // Append the alert to the wrapper
        const alertHtml = bar.querySelector('article');
        alertBarWrapper.append(alertHtml);
      });
      
      // Add body class to indicate alerts are active
      document.body.classList.add('alerts-active');
      
      // Set up dismissal functionality
      specialAlertsFeed.setDismiss();
    },

    /**
     * Fetches alert data from the thedig.howard.edu API.
     *
     * Constructs the API URL with proper date filtering and makes a fetch
     * request to retrieve current alerts. Handles the response and passes
     * the data to the alert processing function.
     */
    loadEventData: function () {
      // API configuration
      const site = 'https://thedig.howard.edu';
      const isoDate = new Date().toISOString();
      
      // Construct API URL with filters for active alerts
      const path = site + "/jsonapi/node/alert" +
        "?filter[start-date][condition][path]=field_alert_start_date" +
        "&filter[start-date][condition][value]=" + isoDate +
        "&filter[start-date][condition][operator]=%3C%3D" +
        "&filter[end-date][condition][path]=field_alert_end_date" +
        "&filter[end-date][condition][value]=" + isoDate +
        "&filter[end-date][condition][operator]=%3E%3D" +
        "&filter[status][value]=1";
      
      // Fetch alert data
      fetch(path)
        .then((response) => response.json())
        .then((json) => specialAlertsFeed.checkAlerts(json.data, site))
        .catch((err) => {
          console.error('Howard Alerts Feed: Error fetching alert data:', err);
        });
    },

    /**
     * Processes alert data and filters dismissed alerts.
     *
     * Checks each alert against stored dismissal cookies and builds a list
     * of alerts that should be displayed. Calls the appropriate display
     * function based on whether any alerts remain.
     *
     * @param {Array} data - Raw alert data from the API.
     * @param {string} site - Base URL for the alerts site.
     */
    checkAlerts: function (data, site) {
      if (data.length) {
        let alerts = [];
        
        // Filter out dismissed alerts
        for (let k in data) {
          let cookie = specialAlertsFeed.getCookie('howard-newsroom-alerts--' + data[k]['id']);
          if (cookie == null) {
            data[k]['env'] = site;
            alerts.push(data[k]);
          }
        }
        
        // Display alerts or hide container
        if (alerts.length) {
          specialAlertsFeed.setAlertBars(alerts);
        } else {
          specialAlertsFeed.hideAlerts();
        }
      } else {
        specialAlertsFeed.hideAlerts();
      }
    },

    /**
     * Hides the alerts container when no alerts are active.
     *
     * Sets the display style to none and adds a body class to indicate
     * no alerts are present.
     */
    hideAlerts: function () {
      let alertsWrapper = document.querySelector('.alerts-feed-wrapper');
      if (alertsWrapper) {
        alertsWrapper.style.display = 'none';
      }
      document.body.classList.add('no-alerts');
    },

    /**
     * Sets up dismissal functionality for alerts.
     *
     * Attaches click event listeners to all dismiss buttons and handles
     * the dismissal process including hiding the alert and setting cookies.
     */
    setDismiss: function () {
      let dismissButtons = document.querySelectorAll(".newsroom-alert-dismiss");
      
      dismissButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          
          let alertId = button.getAttribute("data-alert-id");
          let alertElement = document.getElementById("newsroom-alert-" + alertId);
          
          if (alertElement) {
            alertElement.classList.add("hidden");
            specialAlertsFeed.setCookie(
              'howard-newsroom-alerts--' + alertId, 
              'Howard Dig Alert ' + alertId + ' dismissed.', 
              1
            );
          }
        });
      });
    },

    /**
     * Sets a cookie with the specified key, value, and expiration.
     *
     * Used to store alert dismissal preferences. If no expiration is
     * specified, the cookie is set to expire in the far future.
     *
     * @param {string} key - The cookie name.
     * @param {string} value - The cookie value.
     * @param {number} days - Number of days until expiration (optional).
     */
    setCookie: function (key, value, days) {
      let expires = new Date();
      
      if (days) {
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ";expires=" + expires.toUTCString() + ";path=/";
      } else {
        document.cookie = key + '=' + value + ";expires=Fri, 30 Dec 9999 23:59:59 GMT;path=/";
      }
    },

    /**
     * Retrieves a cookie value by key.
     *
     * Used to check if an alert has been dismissed by looking for the
     * corresponding dismissal cookie.
     *
     * @param {string} key - The cookie name to retrieve.
     * @returns {string|null} The cookie value or null if not found.
     */
    getCookie: function (key) {
      let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }
  };

  // Initialize the alerts feed when the script loads
  specialAlertsFeed.loadEventData();
})();
