import { useState } from 'react'
import Calendar from 'react-calendar'
import styles from './Calendar.module.scss'
import useStore from '../../store/stateSettings'

const MyCalendar = () => {
  const [calendarDayValue, setCalendarDayValue] = useState(new Date())
  const {
    openPopup,setOpenPopup,
    setCalendarTime
  } = useStore()

  const confirmClick = () => {
    const date = new Date(calendarDayValue);
    setCalendarTime(date.toISOString())
  
    setOpenPopup('materialContent')
  }

  return (
    <div className={`${styles.calendarWrapper} ${(openPopup === 'calendar') ? styles.active : ''}`}>
      <div className={styles.calendarPanel}>
        <p className={styles.calendarTitle}>日付</p>

        <Calendar
          value={calendarDayValue}
          onClickDay={(e) => setCalendarDayValue(e)}
          locale='ja-JP'
          formatYear={(locale, date) => `${date.getFullYear()}年`}
          formatMonthYear={(locale, date) =>
            `${date.getFullYear()}年${date.getMonth() + 1}月`
          }
          formatShortWeekday={(locale, date) =>
            ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
          }
          
          formatDay={(locale, date) => date.getDate()}
          prevLabel='‹'
          nextLabel='›'
          prev2Label={null}
          next2Label={null}
        />

        <button className={styles.todayLink} onClick={() => setCalendarDayValue(new Date())}>
          今日の日付を設定
        </button>

        <div className={styles.buttonRow}>
          <button className={styles.cancelBtn} onClick={() => setOpenPopup('')}>
            キャンセル
          </button>
          <button className={styles.confirmBtn} onClick={confirmClick}>
            設定
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyCalendar