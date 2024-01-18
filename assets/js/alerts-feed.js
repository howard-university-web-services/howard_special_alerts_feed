/**
 * @file
 * Contains the definition of the behavior specialAlertsFeed.
 */


(function () {
  'use strict';

  let specialAlertsFeed = {
    alertBar: `<article id="" class=""> 
                    <a class="newsroom-alert" href="">
                        <strong></strong>
                    </a>
                    <a class="newsroom-alert-dismiss" data-alert-id="">
                        <span class="hidden">Dismiss alert</span>
                    </a>
                </article>`,

    setAlertBars: function (data) {

      let alertBarWrapper = document.getElementById("howard_special_alerts_feed");
      data.forEach(alert => {
        let parser = new DOMParser();
        let bar = parser.parseFromString(specialAlertsFeed.alertBar, "text/html");
        let url = alert.env + alert.attributes.path.alias;

        if (alert.attributes.field_alert_links.uri) {
          url = alert.attributes.field_alert_links.uri;
        }
        bar.querySelector("article").setAttribute('id', "newsroom-alert-" + alert.id + "");
        bar.querySelector("article").setAttribute('class', "newsroom-alert--" + alert.id + "");
        bar.querySelector("article a.newsroom-alert").setAttribute('class', "newsroom-alert newsroom-alert--" + alert.attributes.field_alert_level + "");
        bar.querySelector("article a.newsroom-alert").setAttribute('href', "" + url + "");
        bar.querySelector("article a.newsroom-alert strong").innerHTML = alert.attributes.title;
        if (alert.attributes.field_alert_subtitle) {
          bar.querySelector("article a.newsroom-alert").textContent += "" + alert.attributes.field_alert_subtitle + "";
        }
        bar.querySelector("article a.newsroom-alert-dismiss").setAttribute("data-alert-id", alert.id);
        bar.querySelector("article a.newsroom-alert-dismiss span").textContent += " " + alert.id;
        const alertHtml = bar.querySelector('article');
        alertBarWrapper.append(alertHtml);
      });
      // Add body class
      document.body.classList.add('alerts-active');
      // Set dismiss functionality
      specialAlertsFeed.setDismiss();

    },
    loadEventData: function () {
      // Set URL
      const site = 'https://thedig.howard.edu';
      // Get todays date, and format to ISO
      const isoDate = new Date().toISOString();
      const path = site + "/jsonapi/node/alert?filter[start-date][condition][path]=field_alert_start_date&filter[start-date][condition][value]=" + isoDate + "&filter[start-date][condition][operator]=%3C%3D&filter[end-date][condition][path]=field_alert_end_date&filter[end-date][condition][value]=" + isoDate + "&filter[end-date][condition][operator]=%3E%3D&filter[status][value]=1";
      fetch(path)
        .then((response) => response.json())
        .then((json) => specialAlertsFeed.checkAlerts(json.data, site))
        .catch((err) => console.log(err));
    },
    checkAlerts: function (data, site) {
      if (data.length) {
        let alerts = [];
        for (let k in data) {
          let cookie = specialAlertsFeed.getCookie('howard-newsroom-alerts--' + data[k]['id']);
          if (cookie == null) {
            data[k]['env'] = site;
            alerts.push(data[k]);
          }
        }
        data = alerts;
        if (data.length) {
          specialAlertsFeed.setAlertBars(data);
        } else {
          specialAlertsFeed.hideAlerts();
        }
      } else {
        specialAlertsFeed.hideAlerts();
      }
    },
    hideAlerts: function () {
      document.querySelector('.alerts-feed-wrapper').style.display = 'none';
      document.body.classList.add('no-alerts');
    },
    setDismiss: function () {
      // Attach click functionality.
      let dismiss = document.querySelectorAll(".newsroom-alert-dismiss");
      dismiss.forEach(function (el, i) {
        el.addEventListener("click", function () {
          let alertId = el.getAttribute("data-alert-id");
          document.getElementById("newsroom-alert-" + alertId).classList.add("hidden");
          specialAlertsFeed.setCookie('howard-newsroom-alerts--' + alertId, 'Howard Dig Alert ' + alertId + ' dismissed.', 1);
        });
      });
    },
    setCookie: function (key, value, days) {
      let expires = new Date();
      if (days) {
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ";expires=" + expires.toUTCString();
      } else {
        document.cookie = key + '=' + value + ";expires=Fri, 30 Dec 9999 23:59:59 GMT;";
      }
    },
    getCookie: function (key) {
      let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
    }
  }
  specialAlertsFeed.loadEventData();
})();
