import React, { useEffect } from 'react';
import "./styles/carousel.css";
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";
// import CardsCities from './pages/Cities';
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CardsCities from './pages/Cities';
import citiesActions from "./redux/actions/citiesActions";
import { useDispatch, useSelector } from "react-redux"
import Loginpage from './pages/Loginpage';
import SignUpPage from './pages/SignUpPage';
import SnackBar from "./components/SnackBar";
import Login from './components/Login';
import SignUp from './components/SignUp';
import usersActions from "./redux/actions/usersActions"
import { Toaster } from 'react-hot-toast'
import {useNavigate } from "react-router-dom"


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(citiesActions.getCities())
    // eslint-disable-next-line
  }, [])

  const user = useSelector(store => store.usersReducer.user)
  // console.log(user)
  const navigate = useNavigate()

  useEffect(() => { //cuando se recarga la pagina 

    if (localStorage.getItem('token') !== null) { //si en el localS el item es distinto de null 
      const token = localStorage.getItem("token")
      // console.log(token)
      dispatch(usersActions.verifytoken(token))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            boxShadow: "0px 3px 10px rgba(8, 8, 8, 0.413)",
            padding: '1rem',
            color: 'black',
            textAlign: "center",
            fontSize: "14px",
          },
        }} />
      <SnackBar />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/Cities" element={<CardsCities />} />
        <Route path='/CitiesMap/:id' element={<Detail />} />
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/SignUp' element={<SignUpPage />} />
        <Route path='/Login' element={<SignUp />} />
        <Route path='/SignUp' element={<Login />} />
        <Route path="/signUp" element={ localStorage.getItem('token')? (<navigate to="/"/>): <SignUp/>} />
        <Route path="/Login" element={ localStorage.getItem('token')? (<navigate to="/"/>): <Login/>} />
      </Routes >
      <ScrollToTop
        style={{
          backgroundColor: 'rgba(99, 120, 136, 0.984)', right: "48px", marginbottom: "80px",
          bottom: "185px",
        }}
        smooth
        component={<KeyboardArrowUpIcon />}
      />
      <Footer />

    </>
  );

}
export default App