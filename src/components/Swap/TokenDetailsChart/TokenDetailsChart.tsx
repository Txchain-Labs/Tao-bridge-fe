import React from "react"
import "./TokenDetailsChart.sass"
import highIcon from "../../../assets/high-icon.svg"
import ReactApexChart from 'react-apexcharts'
import {ethOhlc} from "../TokenMiniChart/graphs"
import {ITransactionData} from "../Swap"
import TokenLogo from "../TokenLogo/TokenLogo"

const TokenDetailsChart = ({transactionData} : {transactionData: ITransactionData}) => {
  const isMobile: boolean = window.matchMedia("(max-width: 768px)").matches

  return (
    <div className="token-details-chart">
      <div className="token-details-chart-info">
        <div className="token-details-chart-info-main">
          <div>
            {transactionData.input.currency?.logo ?
              <img
                className="token-details-chart-info-logo"
                src={transactionData.input.currency?.logo}
                alt={transactionData.input.currency?.name}
              /> :
              <TokenLogo size={isMobile ? 34 : 64} symbol={transactionData.input.currency?.id || ""}/>
            }
          </div>
          <div className="token-details-chart-info-main-name">
            <h3>{transactionData.input.currency?.id}/{transactionData.output.currency?.id}</h3>
            <p>{transactionData.input.currency?.name}</p>
          </div>
        </div>
        <div className="token-details-chart-info-data">
          <h3>${transactionData.input.currency?.value}</h3>
          <p>Price</p>
        </div>
        <div className="price-high-and-low desktop-only">
          <div className="token-details-chart-info-data">
            <h3>24,400.0</h3>
            <p><img src={highIcon} alt=""/> 24h High</p>
          </div>
          <div className="token-details-chart-info-data">
            <h3>24,400.0</h3>
            <p><img src={highIcon} className="rotated" alt=""/> 24h Low</p>
          </div>
        </div>
      </div>
      <ReactApexChart
        className="token-details-chart-graph"
        series={[{
          data: ethOhlc
        }]}
        options={{
          chart: {
            type: 'candlestick',
            height: 310,
            toolbar: {
              show: false
            },
            background: 'var(--secondary-bg-color)',
            foreColor: 'var(--main-text-color)'
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#26A69A',
                downward: 'var(--primary-red-color)'
              },
            }
          },
          yaxis: {
            opposite: true,
            labels: {
              show: !isMobile,
              formatter: function(value) {
                return "$" + value
              }
            }
          },
          xaxis: {
            type: 'datetime',
            tickAmount: 10,
            tickPlacement: "between",
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: true,
              color: 'var(--main-border-color)',
            },
            labels: {
              show: !isMobile,
              formatter: function(value) {
                return new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
              }
            }
          },
          grid: {
            show: true,
            borderColor: 'var(--main-border-color)',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
              lines: {
                show: true
              }
            },
            yaxis: {
              lines: {
                show: true
              }
            },
            row: {
              colors: undefined,
              opacity: 0.5
            },
            column: {
              colors: undefined,
              opacity: 0.5
            },
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
          },
          theme: {
            mode: "dark"
          }
        }}
        type="candlestick"
        height={isMobile ? 150 : 350}
      />
      <div className="token-details-chart-info mobile-only">
        <div className="price-high-and-low">
          <div className="token-details-chart-info-data">
            <h3>24,400.0</h3>
            <p><img src={highIcon} alt=""/> 24h High</p>
          </div>
          <div className="token-details-chart-info-data">
            <h3>24,400.0</h3>
            <p><img src={highIcon} className="rotated" alt=""/> 24h Low</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenDetailsChart