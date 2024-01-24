import React from "react"
import logo from "../../assets/logo.svg"
import "./Footer.sass"
import discordIcon from "../../assets/socials/discord.svg"
import githubIcon from "../../assets/socials/github.svg"

const FooterSocialLink = ({url, icon} : {url: string, icon: string}) => (
  <li>
    <a target="_blank" href={url} rel="noreferrer">
      <img className="vector-image" src={icon} alt="discord"/>
    </a>
  </li>
)

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img className="vector-image" src={logo} alt="Bittensor"/>
      </div>
      <div>
        <div>
          <ul>
            <FooterSocialLink url="https://discord.gg/qasY3HA9F9" icon={discordIcon}/>
            <FooterSocialLink url="https://github.com/opentensor" icon={githubIcon}/>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer