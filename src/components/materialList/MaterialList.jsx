import styles from './MaterialList.module.scss'
import useStore from '../../store/stateSettings'

const MaterialList = () => {
   const {
    setOpenPopup
  } = useStore()
  return (
    <div className={styles.meterials}>
      <button className={styles.addMaterial} onClick={() => setOpenPopup('addMaterial')}>教材を追加 </button>
    </div>
  )
}

export default MaterialList;