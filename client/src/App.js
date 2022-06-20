import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from './components/Home'
import VideogameCreate from './components/VideogameCreate'
import Details from './components/Details'


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route> 
          <Route path= "/videogame" element ={<VideogameCreate/>}></Route>       
          <Route path= '/details/:id' element={<Details/>}></Route> 
        </Routes>
    </BrowserRouter>
  )}

export default App;
