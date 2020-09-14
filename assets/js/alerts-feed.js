/**
 * @file
 * Contains the definition of the behaviour specialAlertsFeed.
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
          // Get todays date, and format to yyyy-mm-dd
          var fullDate = new Date();
          var twoDigitMonth = (fullDate.getMonth() + 1) + "";
          if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
          var twoDigitDate = fullDate.getDate() + "";
          if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
          var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;

          // Get todays time, and format to 00:00:00
          var hours = fullDate.getUTCHours();
          var minutes = fullDate.getUTCMinutes();
          var currentTime = hours + ":" + minutes + ":00";
          var path = drupalSettings.howard_special_alerts_feed.pathToAlertsFeedList + "/api/alerts?filter[start_date][value]=" + currentDate + "%20" + currentTime + "&filter[start_date][operator]='<='&filter[end_date][value]=" + currentDate + "%20" + currentTime + "&filter[end_date][operator]='>='&filter[alert_type]=alert";
          $.ajax({
            url: path,
            method: 'get',
            success: function (data) {
              if (data.data.length) {
                var alerts = [];
                for (var k in data.data) {
                  var cookie = EVENT_METHOD.getCookie('howard-newsroom-alerts--' + data.data[k]['id']);
                  if (cookie == null) {
                    data.data[k]['env'] = drupalSettings.howard_special_alerts_feed.pathToAlertsFeedList;
                    data.data[k]['external_link'] = data.data[k]['external_link'][0]['url'];
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
              EVENT_METHOD.setCookie('howard-newsroom-alerts--' + alertId, 'Howard Newsroom Alert ' + alertId + ' dismissed.', 1);
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
