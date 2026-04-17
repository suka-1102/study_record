import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import MaterialList from "./components/materialList/MaterialList"
import AddMaterial from "./components/addMaterial/AddMaterial"
const App = () => {
  
  return (
    <>
      <Header></Header>
    
      <Sidebar>
      </Sidebar>
      <MaterialList>
      </MaterialList>
      <AddMaterial
      />
    </>
  )
}

export default App

