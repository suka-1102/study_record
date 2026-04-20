import { useState } from "react";
import styles from './AddMaterial.module.scss'
import useStore from "../../store/stateSettings";
// import { useBattleButtons } from '../../system/battleButtons';



const AddMaterial = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("")
  // test
  const maxLength = 128;

  const saveClick = () => {
    const data = localStorage.getItem('materialsData');
    const previousData = data ? JSON.parse(data) : [];
    const addData = {name: name, status:status, time: ''}
    previousData.push(addData)
    localStorage.setItem('materialsData',JSON.stringify(previousData))
    setOpenPopup('')
    
  }


  const {
    openPopup,setOpenPopup
  } = useStore()


  return (
    <div className={`${styles.container} ${(openPopup === 'addMaterial') ? styles.active : ''}`}>
      <div className={styles.top}>
        <button className={styles.closeButton} onClick={() => setOpenPopup('')}>
          ×
        </button>
        <span className={styles.title}>教材の追加</span>
        <button className={styles.saveButton} onClick={saveClick}>
          保存
        </button>
      </div>
      <div className={styles.contentsWrapper}>
        <div className={styles.imageSection}>
          <img
            src="public/material.png"
            alt="教材"
            className={styles.bookImage}
          />
          <div className={styles.nameArea}>
            <label className={styles.nameLabel}>教材名</label>
            <input
              type="text"
              placeholder="教材名"
              value={name}
              maxLength={maxLength}
              onChange={(e) => {
                setName(e.target.value)
                setStatus('learning')
              }}
              className={styles.nameInput}
            />
            <div className={styles.charCount}>
              {name.length}/{maxLength}
            </div>
            <button className={styles.imageSettingButton}>教材画像の設定</button>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.rowLabel}>ステータス</span>
          <button className={styles.rowValue}>学習中</button>
        </div>
        <div className={styles.divider} />

        {/* <div className="statuspopUp">

        </div> */}
        
      </div>
      
    </div>
  );
}

export default AddMaterial;