import React, {useState} from "react"
import "./Header.sass"
import logo from '../../assets/logo.svg'
import menu from '../../assets/menu.svg'
import close from '../../assets/close.svg'
import DarkLightModeSwitcher from "./DarkLightModeSwitcher/DarkLightModeSwitcher"

interface IMenuItem {label: string, url: string}

const Header = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean | null>(null)

  const menuNavItems: IMenuItem[] = [
    {label: "Swap", url: "/swap"},
    {label: "Bridge", url: "/bridge"},
    {label: "Pool", url: "/pool"},
    {label: "Docs", url: "/docs"},
    {label: "Explorer", url: "/explorer"},
    {label: "Socials", url: "/socials"},
  ]

  const NavItem = ({data, active} : {data: IMenuItem, active: boolean}) => {
    return (
      <li className={`header-nav-menu-item ${active ? "active" : ""}`}>
        <a href={data.url}>{data.label}</a>
      </li>
    )
  }

  return (
    <div className="header">
      <div className="header-nav">
        <div><img className="vector-image" src={logo} alt="Bittensor"/></div>
        <ul className={
          `header-nav-menu ${mobileMenuOpened === null ? "" : mobileMenuOpened ? "opened" : "closed"}`
        }>
          {menuNavItems.map((navItem, index) => (
            <NavItem data={navItem} active={window.location.pathname === navItem.url} key={index} />
          ))}
        </ul>
        {mobileMenuOpened ?
          <div className="header-nav-menu-overlay" onClick={() => setMobileMenuOpened(false)}/> : null
        }
      </div>
      <div className="header-nav-action-buttons">
        <DarkLightModeSwitcher/>
        <button>Connect Wallet</button>
        <img
          src={mobileMenuOpened ? close : menu}
          className="header-nav-open-icon"
          alt=""
          onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
        />
      </div>
    </div>
  )
}

export default Header