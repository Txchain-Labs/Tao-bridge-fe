import React from "react"
import "./TokenSelector.sass"
import {ICurrency} from "../Swap"
import TokenLogo from "../TokenLogo/TokenLogo"

const TokenSelector = (
  {
    isOpened, currencies, onChoose, close
  } : {
    isOpened: boolean, currencies: ICurrency[], onChoose: (currency: ICurrency) => void, close: () => void
  }
) => {
  if (!isOpened) return null
  return (
    <div className="token-selector-modal">
      <div className="token-selector-overlay" onClick={() => close()}/>
      <div className="token-selector">
        <ul className="token-selector-list">
          {currencies.map((currency: any) => (
            <li key={currency.id} onClick={() => onChoose(currency)}>
              {currency.logo ?
                <img src={currency.logo} alt={currency.name}/> :
                <TokenLogo symbol={currency.id}/>
              }
              {currency.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TokenSelector