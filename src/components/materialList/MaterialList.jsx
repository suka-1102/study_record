import styles from './MaterialList.module.scss'

const MaterialList = () => {
  return (
    <div className={styles.meterials}>
      <button className={styles.addMaterial}>教材を追加 </button>
    </div>
  )
}

export default MaterialList;