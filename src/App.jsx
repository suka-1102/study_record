import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import MaterialList from "./components/materialList/MaterialList"
import AddMaterial from "./components/addMaterial/AddMaterial"
import MaterialContent from "./components/materialContent/MaterialContent"
import MyCalendar from "./components/calendar/Calendar"

const App = () => {
  
  return (
    <>
      <Header></Header>
    
      <Sidebar>
      </Sidebar>
      <MaterialList>
      </MaterialList>
      <AddMaterial></AddMaterial>
      <MaterialContent></MaterialContent>
      <MyCalendar></MyCalendar>
    </>
  )
}

export default App

