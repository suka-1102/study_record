import { useState } from 'react'
import Calendar from 'react-calendar'
import styles from './Calendar.module.scss'
import useStore from '../../store/stateSettings'

const MyCalendar = () => {
  const [value, setValue] = useState(new Date())

  const handleToday = () => {
    setValue(new Date())
  
  }
  const confirmClick = () => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const result = `${year}年${month}月${day}日 ${hours}:${minutes}`;

    const data = localStorage.getItem('materialsData');
    const previousData = data ? JSON.parse(data) : [];

    const upDatedData = previousData.map((item, index) => {
      if (index === saveIndex) {
        return { ...item, time: result }; 
      }
      return item;
    });

    localStorage.setItem('materialsData', JSON.stringify(upDatedData));    
    setOpenPopup('materialContent')
  }
  const {
    openPopup,setOpenPopup,
    saveIndex
  } = useStore()

  return (
    <div className={`${styles.calendarWrapper} ${(openPopup === 'calendar') ? styles.active : ''}`}>
      <div className={styles.calendarPanel}>
        <p className={styles.calendarTitle}>日付</p>

        <Calendar
          value={value}
          onClickDay={(e) => setValue(e)}
          locale="ja-JP"
          formatYear={(locale, date) => `${date.getFullYear()}年`}
          formatMonthYear={(locale, date) =>
            `${date.getFullYear()}年${date.getMonth() + 1}月`
          }
          formatShortWeekday={(locale, date) =>
            ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
          }
          
          formatDay={(locale, date) => date.getDate()}
          prevLabel="‹"
          nextLabel="›"
          prev2Label={null}
          next2Label={null}
        />

        <button className={styles.todayLink} onClick={handleToday}>
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
