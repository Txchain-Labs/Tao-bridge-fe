import React, {useState} from "react"
import "./Transaction.sass"
import swapIcon from "../../../assets/swap.svg"
import TokenSelector from "../TokenSelector/TokenSelector"
import settingsIcon from "../../../assets/setting.svg"
import chevronDown from "../../../assets/chevron-arrow-down.svg"
import {ICurrency, ITransactionData, TRANSACTION_MODE} from "../Swap"
import TokenLogo from "../TokenLogo/TokenLogo"

interface IInput {
  value: number | undefined, fiatValue: number, currency: ICurrency, balance: string, readOnly: boolean
}

interface ITransaction {
  transactionData: ITransactionData
  setTransactionData: (data: ITransactionData) => void
  changeCurrencies: (inputCurrency: ICurrency, outputCurrency: ICurrency) => void
  currencies: ICurrency[]
  mode: TRANSACTION_MODE
  setMode: (mode: TRANSACTION_MODE) => void
}

const Transaction = (
  {
    transactionData,
    setTransactionData,
    changeCurrencies,
    currencies,
    mode,
    setMode
  } : ITransaction
) => {
  const [crossChainMode, setCrossChainMode] = useState<boolean>(false)
  const [changingInputToken, setChangingInputToken] = useState<boolean>(false)
  const [changingOutputToken, setChangingOutputToken] = useState<boolean>(false)

  const closeChangingTokenModal = () => {
    setChangingInputToken(false)
    setChangingOutputToken(false)
  }

  const swapTransaction = () => {
    setTransactionData({
      ...transactionData,
      input: {...transactionData.output, value: transactionData.output.value || undefined},
      output: {...transactionData.input, value: transactionData.input.value || 0}
    })
  }

  const setTransactionAmount = (value: string) => {
    const inputValue = value ? parseFloat(value) : undefined
    let outputValue: number = 0
    if (inputValue) {
      const inputCurrency = transactionData.input.currency
      const outputCurrency = transactionData.output.currency
      if (inputCurrency && outputCurrency) outputValue = inputValue * inputCurrency.value / outputCurrency.value
    }
    setTransactionData({
      ...transactionData,
      input: {...transactionData.input, value: inputValue},
      output: {...transactionData.output, value: outputValue}
    })
  }

  const getFiatValue = (value: number | undefined, currency: ICurrency) => {
    if (!value) return 0
    return value * currency.value
  }

  const TokenSwitch = (
    {input = false, currency, crossChain = false} :
    {input?: boolean, currency: ICurrency, crossChain?: boolean}
  ) => {
    return (
      <div
        className="currency"
        onClick={() => {
          input ? setChangingOutputToken(true) : setChangingInputToken(true)
        }}
      >
        {currency.logo ?
          <img src={currency.logo} alt={currency.name} className="currency-logo"/> :
          <TokenLogo size={20} symbol={currency.id}/>
        }
        {currency.name}
        {crossChain ? <img src={chevronDown} alt="" className="chevron-down-icon"/> : null}
      </div>
    )
  }

  const renderInput = ({ value, fiatValue, currency, balance, readOnly = true } : IInput) => {
    return (
      <div className="swap-transaction-input-wrapper">
        {crossChainMode ?
          <div className="swap-transaction-input-cross-chain">
            {readOnly ? "To" : "From"}
            <TokenSwitch
              currency={
                readOnly ?
                  {'id': 'polka', 'name': 'Polkadot', 'value': 1588.84, logo: "https://assets.coingecko.com/coins/images/12171/standard/polkadot.png"} :
                  {'id': 'eth', 'name': 'Ethereum', 'value': 1588.84, logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"}
              }
              crossChain
            />
          </div> : null
        }
        <div className="swap-transaction-input-row">
          <div className="input">
            <input
              value={readOnly ? (value || 0).toFixed(2) : value}
              onChange={(event) => setTransactionAmount(event.target.value)}
              type="number"
              placeholder="0"
              min={0}
              readOnly={readOnly}
            />
          </div>
          <div
            className="currency"
            onClick={() => {
              readOnly ? setChangingOutputToken(true) : setChangingInputToken(true)
            }}
          >
            {currency.logo ?
              <img src={currency.logo} alt={currency.name} className="currency-logo"/> :
              <TokenLogo size={26} symbol={currency.id}/>
            }
            {currency.name}
          </div>
        </div>
        <div className="swap-transaction-input-row">
          <div className="annotation">~${fiatValue.toFixed(2)}</div>
          <div className="annotation">Balance: {balance}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="swap-transaction-wrapper">
      <div className="swap-transaction-content">
        <div className="cross-chain-header">
          <h3>Cross-chain swap</h3>
          <label className="switch">
            <input
              type="checkbox"
              id="cross-chain"
              name="cross-chain"
              onChange={event => setCrossChainMode(event.target.checked)}
            />
            <span className="slider round" />
          </label>
        </div>
        <p className="cross-chain-description">
          Swap tokens natively across 7 chains including Ethereum, Arbitrum, Optimism, Polygon, Base and more!
        </p>
      </div>
      <div className="swap-transaction-content full-height">
        <div>
          <div className="swap-transaction-header">
            <h4 className="title">Trade</h4>
            <div className="swap-transaction-header-buttons">
              <div className="swap-transaction-header-buttons-mode">
                <button
                  className={mode === TRANSACTION_MODE.LITE ? "active" : ""}
                  onClick={() => setMode(TRANSACTION_MODE.LITE)}
                >
                  Lite
                </button>
                <button
                  className={mode === TRANSACTION_MODE.PRO ? "active" : ""}
                  onClick={() => setMode(TRANSACTION_MODE.PRO)}
                >
                  Pro
                </button>
              </div>
              <div>
                <button className="swap-transaction-header-buttons-settings">
                  <img className="vector-image" src={settingsIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="swap-transaction-form">
            {renderInput({
              value: transactionData.input.value,
              fiatValue: getFiatValue(transactionData.input.value, transactionData.input.currency),
              currency: transactionData.input.currency,
              balance: "0.00",
              readOnly: false
            })}
            <div className="swap-button">
              <button onClick={swapTransaction}>
                <img className="vector-image" src={swapIcon} alt=""/>
              </button>
            </div>
            {renderInput({
              value: transactionData.output.value,
              fiatValue: getFiatValue(transactionData.output.value, transactionData.output.currency),
              currency: transactionData.output.currency,
              balance: "0.00",
              readOnly: true
            })}
          </div>
        </div>
        <button className="swap-transaction-confirm-button">Trade</button>
      </div>
      <TokenSelector
        isOpened={changingInputToken || changingOutputToken}
        currencies={currencies}
        onChoose={(currency) => {
          changeCurrencies(
            changingInputToken ? currency : transactionData.input.currency,
            changingInputToken ? transactionData.output.currency : currency
          )
          closeChangingTokenModal()
        }}
        close={closeChangingTokenModal}
      />
    </div>
  )
}

export default Transaction