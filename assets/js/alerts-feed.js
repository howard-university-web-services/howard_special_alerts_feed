/**
 * @file
 * Contains the definition of the behavior specialAlertsFeed.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';
  /**
   * Attaches the specialAlertsFeed behavior.
   */
  Drupal.behaviors.specialAlertsFeed = {
    attach: function (context, settings) {
      var EVENT_METHOD = {
        handlerData: function (templateInput) {
          var path = '/' + drupalSettings.howard_special_alerts_feed.pathToAlertsFeedModule + '/assets/templates/alerts-handlebars-template.html'
          $.ajax({
            url: path,
            cache: false,
            success: function (data) {
              var template = Handlebars.compile(data);
              var eventHTML = template(templateInput);
              EVENT_METHOD.renderEvents(eventHTML);
            }
          });
        },
        loadEventData: function () {
          // Set URL
          var site = 'https://thedig.howard.edu';

          // Get todays date, and format to ISO
          var isoDate = new Date().toISOString();
          var path = site + "/jsonapi/node/alert?filter[start-date][condition][path]=field_alert_start_date&filter[start-date][condition][value]=" + isoDate + "&filter[start-date][condition][operator]=%3C%3D&filter[end-date][condition][path]=field_alert_end_date&filter[end-date][condition][value]=" + isoDate + "&filter[end-date][condition][operator]=%3E%3D&filter[status][value]=1";

          $.ajax({
            url: path,
            method: 'get',
            success: function (data) {
              if (data.data.length) {
                var alerts = [];
                for (var k in data.data) {
                  var cookie = EVENT_METHOD.getCookie('howard-newsroom-alerts--' + data.data[k]['id']);
                  if (cookie == null) {
                    // Set the chosen env to be available.
                    data.data[k]['env'] = site;
                    alerts.push(data.data[k]);
                  }
                }
                data.data = alerts;
                if (data.data.length) {
                  EVENT_METHOD.handlerData(data);
                } else {
                  EVENT_METHOD.hideAlerts();
                }
              } else {
                EVENT_METHOD.hideAlerts();
              }
            }
          });
        },
        hideAlerts: function () {
          $('.alerts-feed-wrapper').hide();
          $('body').addClass('no-alerts');
        },
        renderEvents: function (eventHTML) {
          // Add HTML.
          $('body').addClass('alerts-active');
          $('.alerts-feed-wrapper').html(eventHTML);
          // Attach click functionality.
          $(".newsroom-alert-dismiss").each(function () {
            $(this).on("click", function () {
              var alertId = $(this).attr("data-alert-id");
              $('#newsroom-alert-' + alertId).addClass('hidden');
              EVENT_METHOD.setCookie('howard-newsroom-alerts--' + alertId, 'Howard Dig Alert ' + alertId + ' dismissed.', 1);
            });
          });
        },
        setCookie: function (key, value, days) {
          var expires = new Date();
          if (days) {
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
          } else {
            document.cookie = key + '=' + value + ';expires=Fri, 30 Dec 9999 23:59:59 GMT;';
          }
        },
        getCookie: function (key) {
          var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
          return keyValue ? keyValue[2] : null;
        }
      };

      $(document, context).once('specialAlertsFeed').each(function () {
        EVENT_METHOD.loadEventData();
      });

    }
  };
})(jQuery, Drupal, drupalSettings);
