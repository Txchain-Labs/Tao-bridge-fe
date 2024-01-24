import React, {useState} from "react"
import MainLayout from "../../layouts/MainLayout/MainLayout"
import Transaction from "./Transaction/Transaction"
import "./Swap.sass"
import TokenMiniChart from "./TokenMiniChart/TokenMiniChart"
import TokenDetailsChart from "./TokenDetailsChart/TokenDetailsChart"
import TrendingPairs from "./TrendingPairs/TrendingPairs"

export interface ICurrency {id: string, name: string, value: number, logo?: string}
export interface ITransactionItem { value: number | undefined, currency: ICurrency }
export interface ITransactionData {input: ITransactionItem, output: ITransactionItem}

const currencies: ICurrency[]  = [
  {'id': 'α', 'name': 'Alpha', 'value': 2185.31},
  {'id': 'β', 'name': 'Beta', 'value': 1145.36},
  {'id': 'γ', 'name': 'Gamma', 'value': 2042.5},
  {'id': 'δ', 'name': 'Delta', 'value': 1265.27},
  {'id': 'ε', 'name': 'Epsilon', 'value': 2840.31},
  {'id': 'ζ', 'name': 'Zeta', 'value': 2893.22},
  {'id': 'η', 'name': 'Eta', 'value': 2097.85},
  {'id': 'θ', 'name': 'Theta', 'value': 1815.78},
  {'id': 'ι', 'name': 'Iota', 'value': 1304.77},
  {'id': 'κ', 'name': 'Kappa', 'value': 2985.42},
  {'id': 'λ', 'name': 'Lambda', 'value': 2823.42},
  {'id': 'μ', 'name': 'Mu', 'value': 2770.96},
  {'id': 'ν', 'name': 'Nu', 'value': 1373.95},
  {'id': 'ξ', 'name': 'Xi', 'value': 1234.58},
  {'id': 'ο', 'name': 'Omicron', 'value': 1271.27},
  {'id': 'π', 'name': 'Pi', 'value': 2484.34},
  {'id': 'ρ', 'name': 'Rho', 'value': 2508.55},
  {'id': 'σ', 'name': 'Sigma', 'value': 1816.11},
  {'id': 'τ', 'name': 'Tau', 'value': 2219.68},
  {'id': 'υ', 'name': 'Upsilon', 'value': 1246.92},
  {'id': 'φ', 'name': 'Phi', 'value': 2369.29},
  {'id': 'χ', 'name': 'Chi', 'value': 1656.56},
  {'id': 'ψ', 'name': 'Psi', 'value': 1880.96},
  {'id': 'ω', 'name': 'Omega', 'value': 1102.89},
  {'id': 'א', 'name': 'Aleph', 'value': 1339.33},
  {'id': 'ב', 'name': 'Bet', 'value': 1588.84},
  {'id': 'ג', 'name': 'Gimel', 'value': 2051.67},
  {'id': 'ד', 'name': 'Dalet', 'value': 2755.23},
  {'id': 'ה', 'name': 'He', 'value': 1643.89},
  {'id': 'ו', 'name': 'Vav', 'value': 2479.97},
  {'id': 'ז', 'name': 'Zayin', 'value': 2430.05},
  {'id': 'ח', 'name': 'Het', 'value': 1184.21},
  {'id': 'ט', 'name': 'Tet', 'value': 1766.37},
  {'id': 'י', 'name': 'Yod', 'value': 1918.06},
  {'id': 'כ', 'name': 'Kaf', 'value': 1885.86},
  {'id': 'ל', 'name': 'Lamed', 'value': 1310.65},
  {'id': 'מ', 'name': 'Mem', 'value': 2594.76},
  {'id': 'נ', 'name': 'Nun', 'value': 1994.46},
  {'id': 'ס', 'name': 'Samekh', 'value': 1323.17},
  {'id': 'ע', 'name': 'Ayin', 'value': 2958.17},
  {'id': 'פ', 'name': 'Pe', 'value': 1563.41},
  {'id': 'צ', 'name': 'Tsadi', 'value': 2003.53},
  {'id': 'ק', 'name': 'Qof', 'value': 2545.59},
  {'id': 'ר', 'name': 'Resh', 'value': 1364.5},
  {'id': 'ש', 'name': 'Shin', 'value': 1222.5},
  {'id': 'ת', 'name': 'Tav', 'value': 1111.31},
  {'id': 'ا', 'name': 'Alif', 'value': 1859.44},
  {'id': 'ب', 'name': 'Ba', 'value': 1764.7},
  {'id': 'ت', 'name': 'Ta', 'value': 2381.67},
  {'id': 'ث', 'name': 'Tha', 'value': 1255.3},
  {'id': 'ج', 'name': 'Jim', 'value': 2451.45},
  {'id': 'ح', 'name': 'Ha', 'value': 2440.95},
  {'id': 'خ', 'name': 'Kha', 'value': 2964.04},
  {'id': 'د', 'name': 'Dal', 'value': 1072.59},
  {'id': 'ذ', 'name': 'Dhal', 'value': 2715.22},
  {'id': 'ر', 'name': 'Ra', 'value': 1914.02},
  {'id': 'ز', 'name': 'Zay', 'value': 2812.08},
  {'id': 'س', 'name': 'Sin', 'value': 1376.76},
  {'id': 'ش', 'name': 'Shin', 'value': 1521.16},
  {'id': 'ص', 'name': 'Sad', 'value': 1799.91},
  {'id': 'ض', 'name': 'Dad', 'value': 2679.53},
  {'id': 'ط', 'name': 'Tah', 'value': 1334.4},
  {'id': 'ظ', 'name': 'Zah', 'value': 2606.88},
  {'id': 'ع', 'name': 'Ain', 'value': 2521.91},
  {'id': 'غ', 'name': 'Ghayn', 'value': 2641.46},
  {'id': 'ف', 'name': 'Fa', 'value': 2865.66},
  {'id': 'ق', 'name': 'Qaf', 'value': 1563.83},
  {'id': 'ك', 'name': 'Kaf', 'value': 1181.46},
  {'id': 'ل', 'name': 'Lam', 'value': 1227.04},
  {'id': 'م', 'name': 'Meem', 'value': 1993.57},
  {'id': 'ن', 'name': 'Noon', 'value': 2901.97},
  {'id': 'ه', 'name': 'Ha', 'value': 1525.33},
  {'id': 'و', 'name': 'Waw', 'value': 2455.92},
  {'id': 'ي', 'name': 'Ya', 'value': 1975.48}
]

export enum TRANSACTION_MODE {
  PRO = "pro",
  LITE = "lite"
}

export const getCurrencyById = (id: string) => {
  return currencies.find(currency => currency.id === id)
}

const Swap = () => {
  const isMobile: boolean = window.matchMedia("(max-width: 768px)").matches
  const [transactionData, setTransactionData] = useState<ITransactionData>({
    input: { value: undefined, currency: currencies[0] },
    output: { value: 0, currency: currencies[1] }
  })
  const [mode, setMode] = useState<TRANSACTION_MODE>(
    isMobile ? TRANSACTION_MODE.LITE : TRANSACTION_MODE.PRO
  )

  const changeCurrencies = (inputCurrency: ICurrency, outputCurrency: ICurrency) => {
    const updatedTransactionData: ITransactionData = {
      ...transactionData,
      input: {...transactionData.input, currency: inputCurrency},
      output: {
        value: (transactionData.input.value || 0) * inputCurrency.value / outputCurrency.value,
        currency: outputCurrency
      }
    }
    setTransactionData(updatedTransactionData)
  }

  return (
    <MainLayout>
      <div className="swap-wrapper">
        {mode === TRANSACTION_MODE.LITE && isMobile ?
          null : (
            <div>
              <TrendingPairs onChoose={pair => changeCurrencies(pair.from, pair.to)}/>
              <div>
                <h3 className="section-title">Other Pairs</h3>
                <div className="token-mini-charts-wrapper">
                  <TokenMiniChart tokenId={"ب"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"π"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ψ"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"س"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ל"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ה"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"δ"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ω"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"β"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ي"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ض"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ك"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ז"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"κ"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"μ"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"λ"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ג"} onClick={changeCurrencies}/>
                  <TokenMiniChart tokenId={"ο"} onClick={changeCurrencies}/>
                </div>
              </div>
            </div>
          )
        }
        <div className="swap-interface">
          {mode === TRANSACTION_MODE.LITE && !isMobile ?
            null : (
              <div className="swap-interface-details">
                <TokenDetailsChart transactionData={transactionData}/>
              </div>
            )
          }
          <Transaction
            transactionData={transactionData}
            setTransactionData={(data) => setTransactionData(data)}
            changeCurrencies={changeCurrencies}
            currencies={currencies}
            mode={mode}
            setMode={(mode) => setMode(mode)}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Swap