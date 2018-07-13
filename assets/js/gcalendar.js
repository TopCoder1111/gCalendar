(function($) {

  $.fn.gCalReader = function(options) {
    var $div = $(this);

    var defaults = $.extend({
        calendarId: 'en.usa#holiday@group.v.calendar.google.com',
        apiKey: 'Public_API_Key',
        dateFormat: 'LongDate',
        errorMsg: 'No events in calendar',
        maxEvents: 50,
        futureEventsOnly: true,
        sortDescending: true
      },
      options);

    var s = '';var modal = '';
    var feedUrl = 'https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(defaults.calendarId.trim()) +'/events?key=' + defaults.apiKey +
      '&orderBy=startTime&singleEvents=true';
      if(defaults.futureEventsOnly) {
        feedUrl+='&timeMin='+ new Date().toISOString();
      }

    $.ajax({
      url: feedUrl,
      dataType: 'json',
      success: function(data) {
        if(defaults.sortDescending){
          data.items = data.items.reverse();
        }
        data.items = data.items.slice(0, defaults.maxEvents);
        var i = 0;
        $.each(data.items, function(e, item) {
        
            i++;
          var eventdate =  item.start.dateTime|| item.start.date ||'';
          var eventTime =  item.start.dateTime || '';
          var summary = item.summary || '';
					var description = item.description;
					var location = item.location;
                    s +=`<div class="col-md-8 col-12">
                    <article aria-labelledby="fsArticle_1524_9402" style="height: 80px;display: inherit;">
                    <time datetime="2018-08-12T14:05:00-04:00" class="event-date"><span class="fsMonth">`+ formatDate(eventdate, defaults.dateFormat.trim()) +`</span></time>
                    <a class="color-burgundy   font-weight-bold" data-occur-id="9402" data-toggle="modal" data-target="#`+i+`_modal"  tabindex="0" > <i class="la la-smile-o font-weight-bold" style="font-size: 23px;"></i>`+summary+`</a>`;
                    if(eventTime.length !==0){
                        s+= `<p style="margin-bottom: 0 !important;">
                        <time datetime="2018-08-12T14:05:00-04:00" class="font-14"><i class="la la-clock-o font-weight-bold gold-font" ></i>`+formatTime(eventTime, defaults.dateFormat.trim())+`</time>
                        </p>`;
                    }
					// if(location) {
					// 	s +='<div class="location">Where: ' + location + '</div>';
					// }
					// if(description) {
					// 	s +='<div class="description">'+ description +'</div>';
                    // }
                    modal +=`<div class="modal fade" id="`+i+`_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block; padding-right: 17px;">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title color-burgundy" id="myModalLabel">
                            `+summary+`
                          </h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span> </button>
                        </div>
                        <div class="modal-body">`;
                    if(eventdate){
                        modal +=`<p class="">`+formatDate(eventdate, defaults.dateFormat.trim()) +`</p>`;
                    }
                    if(description) {
                        modal +=`<p class="">`+description+`</p>`;
                    }
                    if(location){
                        modal +=`<p class=""><i class="la la-map-marker font-weight-bold gold-font" ></i>`+location+`</p>`;
                    }
                    if(eventTime.length !==0){
                        modal +=`<p class=""><i class="la la-clock-o font-weight-bold gold-font" ></i>&nbsp;&nbsp;`+formatTime(eventTime, defaults.dateFormat.trim())+`</p>`;
                    }
                    
                    modal+=`</div></div></div></div></div>`;
                    s+='</article></div><hr class="mb-3 w-60 mx-auto" />';
					
        });
        console.log(modal);
        console.log(s);
        $($div).append(s+modal);
      },
      error: function(error) {
        $($div).append('<p>' + defaults.errorMsg + ' | ' + error + '</p>');
      }
    });
  
    function formatTime (eventTime)
    {   
        console.log('=>'+eventTime);
        if (eventTime.length > 10) {
            arrDate = /(\d+)\-(\d+)\-(\d+)T(\d+)\:(\d+)/.exec(eventTime);
    
            am = (arrDate[4] < 12);
            time = am ? (parseInt(arrDate[4]) + ':' + arrDate[5] + ' AM') : (
              arrDate[4] - 12 + ':' + arrDate[5] + ' PM');
    
            if (time.indexOf('0') === 0) {
              if (time.indexOf(':00') === 1) {
                if (time.indexOf('AM') === 5) {
                  time = 'MIDNIGHT';
                } else {
                  time = 'NOON';
                }
              } else {
                time = time.replace('0:', '12:');
              }
            }
    
          } else {
            arrDate = /(\d+)\-(\d+)\-(\d+)/.exec(eventTime);
            time = '';
          }
           return time;

    }
    function formatDate(strDate, strFormat) {
      var fd, arrDate, am, time;
      var calendar = {
        months: {
          full: ['', 'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October',
            'November', 'December'
          ],
          short: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ]
        },
        days: {
          full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday', 'Sunday'
          ],
          short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sun'
          ]
        }
      };
      console.log(strDate.length);
      if (strDate.length > 10) {
        arrDate = /(\d+)\-(\d+)\-(\d+)T(\d+)\:(\d+)/.exec(strDate);

        am = (arrDate[4] < 12);
        time = am ? (parseInt(arrDate[4]) + ':' + arrDate[5] + ' AM') : (
          arrDate[4] - 12 + ':' + arrDate[5] + ' PM');

        if (time.indexOf('0') === 0) {
          if (time.indexOf(':00') === 1) {
            if (time.indexOf('AM') === 5) {
              time = 'MIDNIGHT';
            } else {
              time = 'NOON';
            }
          } else {
            time = time.replace('0:', '12:');
          }
        }

      } else {
        arrDate = /(\d+)\-(\d+)\-(\d+)/.exec(strDate);
        time = '';
      }
      console.log(arrDate);
      var year = parseInt(arrDate[1])
      var month = parseInt(arrDate[2]);
      var dayNum = parseInt(arrDate[3]);

      var d = new Date(year, month - 1, dayNum);

      switch (strFormat) {
        case 'ShortTime':
          fd = time;
          break;
        case 'ShortDate':
          fd = month + '/' + dayNum + '/' + year;
          break;
        case 'LongDate':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year;
          break;
        case 'LongDate+ShortTime':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year ;
          break;
        case 'ShortDate+ShortTime':
          fd = month + '/' + dayNum + '/' + year;
          break;
        case 'DayMonth':
          fd = calendar.days.short[d.getDay()] + ', ' + calendar.months.full[
            month] + ' ' + dayNum;
          break;
        case 'MonthDay':
          fd = calendar.months.short[month] + ' ' + dayNum;
          break;
        case 'YearMonth':
          fd = calendar.months.full[month] + ' ' + year;
          break;
        default:
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.short[
            month] + ' ' + dayNum + ', ' + year;
      }

      return fd;
    }
  };

}(jQuery));
