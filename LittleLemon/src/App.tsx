import HomePage from "./Sections/HomePage"
import MenuSection from "./Sections/MenuSection"
import ReservationCard from "./Sections/ReservationCard"
import { menuItems } from "./Info/menuData";
import "./Styles/App.scss"
import Navbar from "./Sections/Navbar";
import Footer from "./Sections/Footer";

function App() {

  return (
      <div className="container-app">
        <Navbar/>
        <HomePage/>
        <MenuSection items = {menuItems}/>
        <ReservationCard/>
        <Footer/>
      </div>
  )
}

export default App
