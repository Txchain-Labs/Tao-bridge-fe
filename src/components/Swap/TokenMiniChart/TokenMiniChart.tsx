import {Line, LineChart, ResponsiveContainer, YAxis} from "recharts"
import React, {useEffect, useState} from "react"
import "./TokenMiniChart.sass"
import {taoGraph} from "./graphs"
import arrowUp from "../../../assets/arrow-up.svg"
import arrowDown from "../../../assets/arrow-down.svg"
import {getCurrencyById, ICurrency} from "../Swap"

const TokenMiniChart = (
  {tokenId, onClick} : {tokenId: string, onClick: (inputCurrency: ICurrency, outputCurrency: ICurrency) => void}
) => {
  const [graphData, setGraphData] = useState<any>()
  const [tokenData, setTokenData] = useState<ICurrency>()
  const change = Math.floor(Math.random() * 20) + 1
  const positive = Math.random() < 0.5

  const getGraphLimits = (data: any[]): { lowest: number; highest: number } => {
    let lowest = Math.floor(data[0].Price)
    let highest = Math.floor(data[0].Price)

    data.forEach((item) => {
      if (item.Price < lowest) lowest = Math.floor(item.Price)
      if (item.Price > highest) highest = Math.floor(item.Price)
    })

    return { lowest, highest }
  }

  useEffect(() => {
    const loadData = async () => {
      setGraphData(taoGraph)
      setTokenData(getCurrencyById(tokenId))
    }
    loadData()
  }, [tokenId])

  return graphData ? (
    <div className="token-mini-chart" onClick={() => {
      const fromCurrency = getCurrencyById(tokenId)
      const toCurrency = getCurrencyById("τ")
      if (fromCurrency && toCurrency) onClick(fromCurrency, toCurrency)
    }}>
      <div className="token-mini-chart-info">
        <div className="token-mini-chart-info-main">
          <div className="token-mini-chart-info-main-name">
            <h4>{tokenData?.id}/{"τ"}</h4>
          </div>
          <h4 className="token-mini-chart-info-main-price">{tokenData?.value}</h4>
        </div>
        <div className="token-mini-chart-info-daily">
          <div>
            <p>{1.94.toFixed(2)}</p>
            <p className={`token-mini-chart-info-daily-dynamic${positive ? "" : "-negative"}`}>
              <img src={positive ? arrowUp : arrowDown} alt="" className="token-mini-chart-info-daily-dynamic-icon"/>
              {positive ? "" : "-"}{change}%
            </p>
          </div>
          <div>
            <p>H: 276.83</p>
          </div>
          <div>
            <p>L: 253.54</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={56} className="token-mini-chart-graph">
        <LineChart data={graphData}>
          <YAxis domain={[getGraphLimits(graphData).lowest, getGraphLimits(graphData).highest]} hide={true} />
          <Line type="monotone" dataKey="Price" stroke="var(--primary-green-color)" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ) : null
}

export default TokenMiniChart