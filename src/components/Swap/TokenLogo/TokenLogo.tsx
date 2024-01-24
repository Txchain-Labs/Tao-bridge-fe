import React from "react"
import "./TokenLogo.sass"

const TokenLogo = ({symbol, size = 24} : {symbol: string, size?: 20 | 24 | 26 | 34 | 64}) => {
  return (
    <div
      className="token-logo"
      style={{width: size, height: size, fontSize: size === 64 ? "36px" : "initial"}}
    >
      {symbol}
    </div>
  )
}

export default TokenLogo