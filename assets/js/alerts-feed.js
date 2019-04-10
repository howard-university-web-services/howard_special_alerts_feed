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
      var EVENT_METHOD ={
        handlerData : function(templateInput){
          var source;
          var template;
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

        loadEventData : function(){
          // Get todays date, and format to yyyy-mm-dd
          var fullDate = new Date();
          var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
          var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
          var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;

          // Get todays time, and format to 00:00:00
          var hours = fullDate.getUTCHours();
          var minutes = fullDate.getUTCMinutes();
          var currentTime = hours + ":" + minutes + ":00";
          var path = drupalSettings.howard_special_alerts_feed.pathToAlertsFeedList + "/api/alerts?filter[start_date][value]=" + currentDate + "%20" + currentTime + "&filter[start_date][operator]='<='&filter[end_date][value]=" + currentDate + "%20" + currentTime + "&filter[end_date][operator]='>='";

          $.ajax({
            url: path,
            method: 'get',
            success: function (data) {
              if (data.data.length) {
                for(var k in data.data) {
                  data.data[k]['env'] = drupalSettings.howard_special_alerts_feed.pathToAlertsFeedList;
                }
                EVENT_METHOD.handlerData(data);
                $('body').addClass('alerts-active');
              } else {
                $('.alerts-feed-wrapper').hide();
                $('body').addClass('no-alerts');
              }
            }
          });
        },
        renderEvents : function(eventHTML){
          $('.alerts-feed-wrapper').html(eventHTML);
        }
      };

      $(document).ready(function(){
        EVENT_METHOD.loadEventData();
      });

    }
  };
})(jQuery, Drupal, drupalSettings);
