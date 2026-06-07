import styles from './MaterialList.module.scss'
import useStore from '../../store/stateSettings'


const MaterialList = () => {
  const {
    openPopup, setOpenPopup,
    saveIndex, setSaveIndex,
    deleteMaterialState, materials
  } = useStore()
  const deleteClick = () => {
    deleteMaterialState(saveIndex)
    setOpenPopup(``)
    
  }
  return (
    <div className={styles.materials}>
      <ul className={styles.materialList}>
        {materials.map((item, index) => (
            <li key={index} onClick={() => {
              setOpenPopup(`materialContent`)
              setSaveIndex(index);
            }}
            >
              <ul className={`${styles.meterialDetail} ${(openPopup === `materialDetail${index}`) ? styles.active : ''}`}>
                <li className={styles.back} onClick={(e) => {
                  e.stopPropagation()
                  setOpenPopup(``)
                }}>戻る</li>
                {/* <li className={styles.edit}>編集</li> */}
                <li className={styles.delete} onClick={(e) => {
                  e.stopPropagation()
                  setOpenPopup(`detailPopup`)
                  
                }}>
                  削除</li>
              </ul>
              <button onClick={(e) => {
                e.stopPropagation();
                setOpenPopup(`materialDetail${index}`);
                setSaveIndex(index);

              }} className={`fa-solid fa-ellipsis`}></button>
              {/* <span className={styles.meterialImage}></span> */}
              <div className={styles.bookCover}>
                <div className={styles.bookCoverInner} />
              </div>

              <div className={styles.materialName}>{item.name}</div>
            </li>
          ))
        }
      </ul>
      <div className={`${styles.mask} ${(openPopup === `detailPopup`) ? styles.active : ''}`}></div>
      <div className={`${styles.detailPopup} ${(openPopup === `detailPopup`) ? styles.active : ''}`}>
        <p>本当に削除しますか？</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.cancel} onClick={() => setOpenPopup(``)}>キャンセル</button>
          <button className={styles.proceed} onClick={deleteClick}>削除</button>
        </div>
      </div>
      <button className={styles.addMaterial} onClick={() => setOpenPopup('addMaterial')}>教材を追加 </button>
    </div>
  )
}

export default MaterialList;