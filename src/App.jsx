import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'
import MaterialList from './components/materialList/MaterialList'
import AddMaterial from './components/addMaterial/AddMaterial'
import MaterialContent from './components/materialContent/MaterialContent'
import MaterialEdit from './components/materialEdit/MaterialEdit'
import MyCalendar from './components/calendar/Calendar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Report from './components/report/Report'
const App = () => {
  
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={
          <>
            <MaterialList />
            <AddMaterial />
            <MaterialContent />
            <MaterialEdit />
            <MyCalendar />
          </>
        } />
        <Route path='/report' element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App