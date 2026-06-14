import styles from './MaterialContent.module.scss'
import useStore from '../../store/stateSettings';
import { useState, useEffect } from 'react';

const MaterialContent = () => {
  const {
    openPopup, setOpenPopup,
    saveItemId,
    calendarTime, setCalendarTime,
    setMaterials,
  } = useStore()
  const [studyTimeLog, setStudyTimeLog] = useState(false);
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [memo, setMemo] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('materialsData')) || [];
    const item = data.find(item => item.id === saveItemId);
    if (item) {
      setMemo(item.memo || '');
      setHours(0);
      setMinutes(0);
    }
  }, [saveItemId])

  const materialDatas = JSON.parse(localStorage.getItem('materialsData')) || [];
  const materialData = materialDatas.find(item => item.id === saveItemId)

  const studyTimeSet = () => {
    const h = Number(hours) || 0
    const m = Number(minutes) || 0
    if (h < 0 || h > 24 || m < 0 || m > 59) {
      alert('時間は0～23、分は0〜59で入力してください')
      return
    }
    setStudyTimeLog(false)
  }

  const saveRecord = () => {
    const hoursNum = Number(hours) || 0
    const minutesNum = Number(minutes) || 0

    if (!calendarTime || (hoursNum === 0 && minutesNum === 0)) {
      alert('時刻と学習時間を記録してください')
      return
    }

    const data = localStorage.getItem('materialsData');
    const previousData = data ? JSON.parse(data) : [];

    const upDatedData = previousData.map(item => {
      if (item.id === saveItemId) {
        return {
          ...item,
          records: {
            date: [...(item.records?.date || []), calendarTime],
            hours: [...(item.records?.hours || []), hoursNum],
            minutes: [...(item.records?.minutes || []), minutesNum],
          },
          memo: memo,
        };
      }
      return item;
    });

    setMaterials(upDatedData)
    setCalendarTime()
    setHours(0)
    setMinutes(0)
    setOpenPopup('')
  }

  const nowBtnClick = (e) => {
    e.stopPropagation()
    setCalendarTime(new Date().toISOString())
  }

  const formatDateJa = (time) => {
    if (!time) return ''
    const d = new Date(time)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${year}年${month}月${day}日 ${hours}:${minutes}`
  }

  return (
    <div className={`${styles.overlay} ${(openPopup === 'materialContent') ? styles.active : ''}`}>
      <div className={styles.header}>
          <button className={styles.closeBtn} onClick={() => setOpenPopup('')}>
            ×
          </button>
          <h2 className={styles.title}>記録の入力</h2>
          <button className={styles.saveBtn} onClick={saveRecord}>記録</button>
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
            {formatDateJa(calendarTime)}
          </span>
          <button className={styles.nowBtn} onClick={nowBtnClick}>現時刻</button>
        </div>

        <div className={styles.divider} />

        <div className={`${styles.fieldRow} ${styles.studyTimeButton}`} onClick={() => setStudyTimeLog(true)}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldPlaceholder}>
            {hours > 0 || minutes > 0 ? (
              <div>{hours || 0}時間{minutes || 0}分</div>
            ) : (
              <div>学習時間</div>
            )}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.memoArea}>
          <textarea
            className={styles.memoInput}
            placeholder='要点・ひとことメモ'
            value={memo ?? ''}
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
              type='number'
              min={0}
              value={hours}
              onChange={(e) =>
                setHours(e.target.value === '' ? '' : Number(e.target.value))
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>分</label>
            <input
              className={styles.input}
              type='number'
              min={0}
              max={59}
              value={minutes}
              onChange={(e) =>
                setMinutes(e.target.value === '' ? '' : Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.cancel} onClick={() => {
            setStudyTimeLog(false),
            setHours(0),
            setMinutes(0)
          }}>キャンセル</button>
          <button className={styles.proceed} onClick={studyTimeSet}>設定</button>
        </div>
      </div>
    </div>
  );
}

export default MaterialContent;