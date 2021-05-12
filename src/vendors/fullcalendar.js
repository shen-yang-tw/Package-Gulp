document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar')

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'zh-tw',
    // plugins: ['dayGrid', 'timeGrid', 'list'], // Not working in new v5.
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth custom1,custom2,custom3'
    },
    // buttonIcons: false, // All button icons display text instead
    customButtons: {
      custom1: {
        text: '列印',
        click: function () {
          window.open('https://www.google.com/')
        }
      },
      custom2: {
        text: '匯出',
        click: function () {
          window.open('https://www.google.com/')
        }
      },
      custom3: {
        text: '增加',
        click: function () {
          // window.open('https://www.google.com/');
          var modal = UIkit.modal($("#add"), {
            center: true
          })
          // var modal = UIkit.modal("#add");
          if (modal.isActive()) {
            modal.hide()
          } else {
            modal.show()
          }
        }
      }
    },
    // events: 'https://fullcalendar.io/demo-events.json',
    events: [{
      title: 'All Day Event',
      url: 'https://www.google.com/',
      start: '2021-05-14', //'xxxx-x-x' not working
      classNames: ['tw-bg-red-500'],
      // backgroundColor: '#ef4444'
    },
    {
      title: 'Long Event',
      start: '2021-05-20',
      end: '2021-05-22',
      classNames: ['tw-bg-red-500'],
    },
    {
      title: 'Event',
      start: '2021-05-23',
      end: '2021-05-25',
      classNames: ['tw-bg-yellow-500']
    },
    {
      title: 'Event',
      start: '2021-05-30',
    }
    ],
    eventClick: function (info) {
      info.jsEvent.preventDefault() // don't let the browser navigate
      if (info.event.url) {
        window.open(info.event.url)
      }
    }
  })

  calendar.render()
});