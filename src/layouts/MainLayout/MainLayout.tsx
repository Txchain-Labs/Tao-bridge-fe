import React from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./MainLayout.sass"

const MainLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <Header/>
      <div className="main-layout-body">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout