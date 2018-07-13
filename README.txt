Google Calendar feed reader - plugin to get upcoming events from a *public* google calendar

#### [Demo](http://bradoyler.github.io/GoogleCalReader-jquery-plugin/examples/)

### Default Options
```js
{
	calendarId:'ski8u1t8r0pr3j4hf2ge08onh0@group.calendar.google.com',
	apiKey:'AIzaSyDIz9PdbnY-k1miB1OH9bQgTd97GJkRKcI',
	dateFormat: 'LongDate',
	errorMsg:'No events in calendar',
	maxEvents: 10,
	futureEventsOnly: true,
	sortDescending: true
}
```

### Example

```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="jquery.googlecalreader-1.1.js" type="text/javascript"></script>

<script type="text/javascript">
  $(function() {
    $('#eventlist').gCalReader({ calendarId:'your_calendar@group.v.calendar.google.com', apiKey:'your_public_api_key'});
  });
</script>
<div id="eventlist"></div>
```

#### Uses Google Calendar api endpoint @
https://developers.google.com/google-apps/calendar/v3/reference/events/list
