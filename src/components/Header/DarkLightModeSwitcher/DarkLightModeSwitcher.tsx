import React, {useEffect, useState} from "react"

enum THEME {
  LIGHT = "light",
  DARK = "dark"
}

const DarkLightModeSwitcher = () => {
  const [theme, setTheme] = useState<THEME>(THEME.DARK)

  const getTheme = (): THEME => {
    return localStorage.getItem("taoExchangeUiTheme") as THEME || THEME.DARK
  }

  const switchTheme = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    localStorage.setItem("taoExchangeUiTheme", newTheme)
    if (newTheme === THEME.LIGHT) document.body.classList.add('light')
    else document.body.classList.remove('light')
    setTheme(newTheme)
  }

  useEffect(() => {
    const currentTheme = getTheme()
    if (currentTheme === THEME.LIGHT) document.body.classList.add('light')
    setTheme(currentTheme)
  }, [])

  return (
    <button className="colour-theme-switcher" onClick={() => switchTheme()}>
      Go {theme === THEME.LIGHT ? "Dark" : "Light"}
    </button>
  )
}

export default DarkLightModeSwitcher