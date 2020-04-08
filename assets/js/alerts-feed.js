/**
 * Created by Dan on 12/11/15.
 * Runs the meat and potatoes of getting the div, getting the JSON, and applying handlebars magic.
 */
(function ($) {

  var EVENT_METHOD = {

    handlerData: function (templateInput) {

      var source;
      var template;
      var path = '/' + Drupal.settings.howard_special_alerts_feed.pathToAlertsFeedModule + '/assets/templates/alerts-handlebars-template.html'
      $.ajax({
        url: path,
        cache: false,
        success: function (data) {
          source = data;
          template = Handlebars.compile(source);
          eventHTML = template(templateInput);
          EVENT_METHOD.renderEvents(eventHTML);
        }
      });
    },

    loadEventData: function () {

      // Get todays date, and format to yyyy-mm-dd
      var fullDate = new Date();
      var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
      var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
      var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;

      // Get todays time, and format to 00:00:00
      var hours = fullDate.getUTCHours();
      var minutes = fullDate.getUTCMinutes();
      var currentTime = hours + ":" + minutes + ":00";

      $.ajax({
        url: Drupal.settings.howard_special_alerts_feed.pathToAlertsFeedList + "/api/alerts?filter[start_date][value]=" + currentDate + "%20" + currentTime + "&filter[start_date][operator]='<='&filter[end_date][value]=" + currentDate + "%20" + currentTime + "&filter[end_date][operator]='>='",
        method: 'get',
        success: function (data) {
          EVENT_METHOD.handlerData(data);
          //console.log(data);
          $('body').addClass('alerts-presented-' + data.count);
        }

      })
    },

    renderEvents: function (eventHTML) {
      $('.alerts-feed-wrapper').html(eventHTML);
    }
  };

  $(document).ready(function () {
    EVENT_METHOD.loadEventData();
  });

}(jQuery));
