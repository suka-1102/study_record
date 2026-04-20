// import { useState } from "react";
import styles from './MaterialContent.module.scss'
import useStore from '../../store/stateSettings';



const MaterialContent = () => {
  const {
    openPopup,setOpenPopup,
    saveIndex
  } = useStore()

  const datas = JSON.parse(localStorage.getItem('materialsData')) || [];
  const data = datas[saveIndex]

  return (
    <div className={`${styles.overlay} ${(openPopup === 'materialContent') ? styles.active : ''}`}>
      <div className={styles.header}>
          <button className={styles.closeBtn} onClick={() => setOpenPopup('')}>
            ×
          </button>
          <h2 className={styles.title}>記録の入力</h2>
          <button className={styles.saveBtn}>記録</button>
        </div>
      <div className={styles.panel}>


        <div className={styles.divider} />

        <div className={styles.bookRow}>
          <div className={styles.bookCover}>
            <div className={styles.bookCoverInner} />
          </div>
          <span className={styles.bookLabel}>{data?.name}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.fieldRow} onClick={() => setOpenPopup(`calendar`)}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldValue}>
            {data?.time}
          </span>
          <button className={styles.nowBtn}>現時刻</button>
        </div>

        <div className={styles.divider} />

        <div className={styles.fieldRow}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldPlaceholder}>学習時間</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.fieldRow}>
          <span className={styles.fieldIcon}></span>
          <span className={styles.fieldPlaceholder}>学習量</span>
          <span className={styles.chevron}></span>
        </div>

        <div className={styles.divider} />

        <div className={styles.memoArea}>
          <textarea
            className={styles.memoInput}
            placeholder="要点・ひとことメモ"
            // value={memo}
            // onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default MaterialContent;