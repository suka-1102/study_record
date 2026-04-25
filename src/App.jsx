import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import MaterialList from "./components/materialList/MaterialList"
import AddMaterial from "./components/addMaterial/AddMaterial"
import MaterialContent from "./components/materialContent/MaterialContent"
import MyCalendar from "./components/calendar/Calendar"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Report from "./components/report/Report"
const App = () => {
  
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <>
            <MaterialList />
            <AddMaterial />
            <MaterialContent />
            <MyCalendar />
          </>
        } />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <Header></Header>
    
    //   <Sidebar>
    //   </Sidebar>
    //   <MaterialList>
    //   </MaterialList>
    //   <AddMaterial></AddMaterial>
    //   <MaterialContent></MaterialContent>
    //   <MyCalendar></MyCalendar>
    // </>
  )
}

export default App

