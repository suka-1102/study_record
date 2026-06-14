import { useState, useEffect } from 'react';
import styles from './MaterialEdit.module.scss'
import useStore from '../../store/stateSettings';

const MaterialEdit = () => {
  const {
    openPopup, setOpenPopup,
    status, setStatus,
    materials, saveItemId, setMaterials
  } = useStore()

  
  const thisDataMaterial = materials.find(material => material.id === saveItemId)
  const [name, setName] = useState(thisDataMaterial?.name ?? '');

  useEffect(() => {
    if(openPopup === 'materialEdit') {
      setName(thisDataMaterial?.name ?? '')
      setStatus(thisDataMaterial?.status ?? '')
    }
  }, [openPopup])
  const [statusModal, setStatusModal] = useState(false)
  const maxLength = 128;


  const saveRecord = () => {
    if (!name.trim()) return;

    const upDatedData = materials.map(item => {
      if (item.id === saveItemId) {
        return {
          ...item,
          name: name,
          status: status,
        };
      }
      return item;
    });
    setMaterials(upDatedData)
    setName('')
    setStatus('')
    setOpenPopup('')
  }

  const getStatus = (status) => {
    switch (status) {
      case 'learning':
        return '学習中';
      case 'completed':
        return '完了';
      case 'standBy':
        return 'スタンバイ';
      default:
        return '';
    }
  };


  return (
    <div className={`${styles.container} ${(openPopup === 'materialEdit') ? styles.active : ''}`}>
      <div className={styles.top}>
        <button className={styles.closeButton} onClick={() => {
          setOpenPopup('')
          setStatus('')
          setName('')
        }}
        >
          ×
        </button>
        <span className={styles.title}>教材の編集</span>
        <button className={styles.saveButton} onClick={saveRecord}>
          保存
        </button>
      </div>
      <div className={styles.contentsWrapper}>
        <div className={styles.imageSection}>
          {/* <img
            src='public/material.png'
            alt='教材'
            className={styles.bookImage}
          /> */}
          <div className={styles.bookCover}>
            <div className={styles.bookCoverInner} />
          </div>
          <div className={styles.nameArea}>
            <label className={styles.nameLabel}>教材名</label>
            <input
              type='text'
              placeholder='教材名'
              value={name}
              maxLength={maxLength}
              onChange={(e) => {
                setName(e.target.value)
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

        <div className={styles.row} onClick={() => setStatusModal(true)}>
          <span className={styles.rowLabel}>ステータス</span>
          <span className={styles.rowValue}>
            {getStatus(status)}
          </span>
        </div>
        <div className={`${styles.mask} ${(statusModal === true) ? styles.active : ''}`}></div>
          <div className={`${styles.studyTimePopup} ${(statusModal === true) ? styles.active : ''}`}>
            <h2 className={styles.title}>ステータス</h2>
  
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <ul>
                  <li>
                    <label>
                      <input
                        type='radio'
                        name='status'
                        value='learning'
                        checked={status === 'learning'}
                        onChange={() => 
                        {
                          setStatusModal(false)
                          setStatus('learning')

                        }}
                      />
                      学習中
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type='radio'
                        name='status'
                        value='completed'
                        checked={status === 'completed'}
                        onChange={() => 
                        {
                          setStatusModal(false)
                          setStatus('completed')
                        }}
                      />
                      完了
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type='radio'
                        name='status'
                        value='standBy'
                        checked={status === 'standBy'}
                        onChange={() => 
                        {
                          setStatusModal(false)
                          setStatus('standBy')
                        }}
                      />
                      スタンバイ
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.cancel} onClick={() => setStatusModal(false) }>キャンセル</div>
          </div>
        <div className={styles.divider} />
        
      </div>
      
    </div>
  );
}

export default MaterialEdit;