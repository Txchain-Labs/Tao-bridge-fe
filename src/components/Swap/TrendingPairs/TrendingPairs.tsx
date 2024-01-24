import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./TrendingPairs.sass"

import {getCurrencyById, ICurrency} from "../Swap"
import TokenLogo from "../TokenLogo/TokenLogo"

interface IPair {
  rank: number
  name: string
  price: number
  apy: number
  onClick: () => void
  from: string
  to: string
  image1?: string
  image2?: string
}

const newPairs = [
  {from: "α", to: "β"},
  {from: "ζ", to: "β"},
  {from: "γ", to: "α"},
  {from: "π", to: "τ"},
  {from: "ζ", to: "τ"},
  {from: "β", to: "π"},
  {from: "π", to: "β"},
  {from: "ض", to: "ق"},
]

const TrendingPairs = ({ onChoose } : { onChoose: ({ from, to } : { from: ICurrency, to: ICurrency }) => void }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  const Pair = ({ rank, from, to, image1, image2, name, price, apy, onClick } : IPair) => {
    return (
      <div className="pair" onClick={onClick}>
        <div className="pair-logos">
          {image1 ? <img src={image1} alt=""/> : <TokenLogo size={34} symbol={from}/>}
          {image2 ? <img src={image2} alt=""/> : <TokenLogo size={34} symbol={to}/>}
        </div>
        <div className="pair-rank">#{rank}</div>
        <button className="pair-button">
          <p className="pair-name">{name}</p>
          <div className="pair-details">
            <div className="pair-details-section">
              Price
              <p className="pair-details-value">${price.toFixed(2)}</p>
            </div>
            <div className="pair-details-section">
              APY
              <p className="pair-details-value">{apy.toFixed(2)}%</p>
            </div>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="trending-pairs">
      <h3 className="section-title">Top 8 Trending pairs</h3>
      <Slider {...settings}>
        {newPairs.map((currenciesPair, index) => {
          const fromCurrency = getCurrencyById(currenciesPair.from)
          const toCurrency = getCurrencyById(currenciesPair.to)
          if (!fromCurrency || !toCurrency) return null
          const pair: IPair = {
            rank: index + 1,
            from: fromCurrency.id,
            to: toCurrency.id,
            image1: fromCurrency.logo,
            image2: toCurrency.logo,
            name: `${fromCurrency.name} / ${toCurrency.name}`,
            price: fromCurrency.value,
            apy: 97.96,
            onClick: () => onChoose({from: fromCurrency, to: toCurrency})
          }
          return <Pair key={pair.rank} {...pair} />
        })}
      </Slider>
    </div>
  )
}

export default TrendingPairs