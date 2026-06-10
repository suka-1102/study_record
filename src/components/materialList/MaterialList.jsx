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
        {materials.map((item, index) => {
          const isMenuOpen = openPopup === `materialDetail${index}`

          return (
            <li key={index} className={styles.materialItem}>
              <button
                type="button"
                className={styles.openMaterial}
                onClick={() => {
                  setOpenPopup(`materialContent`)
                  setSaveIndex(index)
                }}
              >
                <div className={styles.bookCover}>
                  <div className={styles.bookCoverInner} />
                </div>
                <div className={styles.materialName}>{item.name}</div>
              </button>

              <button
                type="button"
                className={`fa-solid fa-ellipsis ${styles.menuToggle}`}
                aria-label="詳細メニュー"
                onClick={() => {
                  setOpenPopup(isMenuOpen ? `` : `materialDetail${index}`)
                  setSaveIndex(index)
                }}
              />

              <ul className={`${styles.meterialDetail} ${isMenuOpen ? styles.active : ''}`}>
                <li>
                  <button type="button" className={styles.back} onClick={() => setOpenPopup(``)}>
                    戻る
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.delete} onClick={() => setOpenPopup(`detailPopup`)}>
                    削除
                  </button>
                </li>
              </ul>
            </li>
          )
        })}
      </ul>

      <div className={`${styles.mask} ${openPopup === `detailPopup` ? styles.active : ''}`} />
      <div className={`${styles.detailPopup} ${openPopup === `detailPopup` ? styles.active : ''}`}>
        <p>本当に削除しますか？</p>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.cancel} onClick={() => setOpenPopup(``)}>キャンセル</button>
          <button type="button" className={styles.proceed} onClick={deleteClick}>削除</button>
        </div>
      </div>

      <button type="button" className={styles.addMaterial} onClick={() => setOpenPopup('addMaterial')}>
        教材を追加
      </button>
    </div>
  )
}

export default MaterialList;