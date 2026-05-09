import styles from './MaterialContent.module.scss'
import useStore from '../../store/stateSettings';
import { useState, useEffect } from 'react';



const MaterialContent = () => {
  const {
    openPopup, setOpenPopup,
    saveIndex,
    calendarTime, setCalendarTime, hoursLog, minutesLog,
    setHoursLog, setMinutesLog
  } = useStore()
  const [studyTimeLog, setStudyTimeLog] = useState(false);
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [memo, setMemo] = useState()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('materialsData')) || [];
    const item = data[saveIndex];
    if (item) {
      setMemo(item.memo || '');
      setHours(0);
      setMinutes(0);
    }
  }, [saveIndex])

  

  const materialDatas = JSON.parse(localStorage.getItem('materialsData')) || [];
  const materialData = materialDatas[saveIndex]



  const studyTimeSet = () => {
    if (hours == null|| minutes == null || (hours == 0 && minutes == 0)) return;
    if(hours == 0) {
      setHoursLog(0)
    } else {
      setHoursLog(hours)
    }
    if(minutes == 0) {
      setMinutesLog(0)
    } else {
      setMinutesLog(minutes)
    }

    setStudyTimeLog(false)
  }

  const saveClick = () => {
    if (!calendarTime || hours == null|| minutes == null || (hours == 0 && minutes == 0)) return;
    const data = localStorage.getItem('materialsData');
    const previousData = data ? JSON.parse(data) : [];

    const upDatedData = previousData.map((item, index) => {
      if (index === saveIndex) {
        return { ...item, 
          time: [...(item.time || []), calendarTime],
          studyTimeH: [...(item.studyTimeH || []), hoursLog],
          studyTimeM: [...(item.studyTimeM || []), minutesLog],
          memo: memo,
        }; 
      }
      return item;
    });
    localStorage.setItem('materialsData', JSON.stringify(upDatedData));  
    setCalendarTime()
    setHoursLog()
    setMinutesLog()
    setHours(0)
    setMinutes(0)
    
    setOpenPopup('')
  }

  const nowBtnClick = (e) => {
    e.stopPropagation()
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const result = `${year}年${month}月${day}日 ${hours}:${minutes}`;
    setCalendarTime(result)
  }

  return (
    <div className={`${styles.overlay} ${(openPopup === 'materialContent') ? styles.active : ''}`}>
      <div className={styles.header}>
          <button className={styles.closeBtn} onClick={() => setOpenPopup('')}>
            ×
          </button>
          <h2 className={styles.title}>記録の入力</h2>
          <button className={styles.saveBtn} onClick={saveClick}>記録</button>
      </div>
      <div className={styles.panel}>


        <div className={styles.divider} />

        <div className={styles.bookRow}>
          <div className={styles.bookCover}>
            <div className={styles.bookCoverInner} />
          </div>
          <span className={styles.bookLabel}>{materialData?.name}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.fieldRow} onClick={() => setOpenPopup(`calendar`)}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldValue}>
            {calendarTime}
          </span>
          <button className={styles.nowBtn} onClick={nowBtnClick}>現時刻</button>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.fieldRow} ${styles.studyTimeButton}`} onClick={() => setStudyTimeLog(true)}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldPlaceholder}>
            {hoursLog > 0 ||minutesLog > 0 ? (
              <div>{hoursLog}時間{minutesLog}分</div>
            ) : (
              <div>学習時間</div>
            )}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.memoArea}>
          <textarea
            className={styles.memoInput}
            placeholder="要点・ひとことメモ"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
      <div className={`${styles.mask} ${(studyTimeLog === true) ? styles.active : ''}`}></div>
        <div className={`${styles.studyTimePopup} ${(studyTimeLog === true) ? styles.active : ''}`}>
          <h2 className={styles.title}>学習時間</h2>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>時間</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>分</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.cancel} onClick={() => setStudyTimeLog(false)}>キャンセル</button>
            <button className={styles.proceed} onClick={studyTimeSet}>設定</button>
          </div>
      </div>
    </div>
  );
}

export default MaterialContent;