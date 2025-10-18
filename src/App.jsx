import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./index.css"
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './components/layout/Home'
import Services from './components/layout/Services'
import { LoadingScreen } from './components/ui/LoadingScreen'
import About from './components/layout/About'
import Reviews from './components/layout/Reviews'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import { AccountDetails } from './pages/AccountDetails'
import { AllReviews } from './pages/AllReviews'

export default function App() {

  const [isLoaded,setIsLoaded] = useState(false);


  return (
    <>
    {!isLoaded && <LoadingScreen onComplete={()=>setIsLoaded(true)}/>}
<div
 className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100":"opacity-0"} bg-black text-gray-100`}>

    <div className="font-sans bg-white text-black min-h-screen">
      <Navbar/>

     <Routes>
            {/* Main Sections */}
            <Route
              path="/"
              element={
                <>
                  <div id="Home">
                    <Home />
                  </div>
                  <div id="service">
                    <Services />
                  </div>
                  <div id="about">
                    <About />
                  </div>
                  <div id="reviews">
                    <Reviews />
                  </div>
                </>
              }
            />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />

            <Route
             path="/dashboard"
             element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
             />
             <Route
             path='/accountdetails'
             element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
             }
              />

              <Route
              path='/allreviews'
              element = {
              <ProtectedRoute>
                <AllReviews />
              </ProtectedRoute>
              }
               />
            
          </Routes>
   
      <Footer/>
    </div>
    </div>
    </>
  );
}
