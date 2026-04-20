import { useState } from "react";
import styles from './MaterialList.module.scss'
import useStore from '../../store/stateSettings'


const MaterialList = () => {
   const {
    openPopup,setOpenPopup,
    saveIndex, setSaveIndex,
    setItemTime
  } = useStore()
  const deleteClick = () => {

    let items = JSON.parse(localStorage.getItem('materialsData')) || [];
    items.splice(saveIndex, 1);
    localStorage.setItem('materialsData', JSON.stringify(items));
    setOpenPopup(``)
    
  }
  return (
    <div className={styles.meterials}>
      <ul className={styles.materialList}>
        {localStorage.getItem('materialsData') && 
          JSON.parse(localStorage.getItem('materialsData')).map((item, index) => (
            <li key={index} onClick={() => {
              const timeLog = JSON.parse(localStorage.getItem('materialsData'))[index]?.time
              setOpenPopup(`materialContent`)
              setSaveIndex(index);
              
            }}
            >
              <ul className={`${styles.meterialDetail} ${(openPopup === `materialDetail${index}`) ? styles.active : ''}`}>
                <li className={styles.edit}>編集</li>
                <li className={styles.delete} onClick={() => setOpenPopup(`detailPopup`)}>削除</li>
              </ul>
              <button  onClick={() => {
                setOpenPopup(`materialDetail${index}`);
                setSaveIndex(index);
              }} className={`fa-solid fa-ellipsis`}></button>
              <span className={styles.meterialImage}></span>
              <div className={styles.materialName}>{item.name}</div>
            </li>
          ))
        }
      </ul>
      <div className={`${styles.mask} ${(openPopup === `detailPopup` ) ? styles.active : ''}`}></div>
      <div className={`${styles.detailPopup} ${(openPopup === `detailPopup`) ? styles.active : ''}`}>
        <p>本当に削除しますか？</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.cancel} onClick={() => setOpenPopup(``)}>キャンセル</button>
          <button className={styles.proceed} onClick ={deleteClick}>削除</button>
        </div>
      </div>
      <button className={styles.addMaterial} onClick={() => setOpenPopup('addMaterial')}>教材を追加 </button>
    </div>
  )
}

export default MaterialList;