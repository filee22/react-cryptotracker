import React, { useState } from 'react'
import './Coin.css'
import Popup from './Popup'

function Coin({
  coinId,
  rank,
  name,
  image,
  symbol,
  price,
  volume,
  pricePerc24h,
  price24h,
  marketcap,
  supply,
  high24h,
  low24h,
}) {
  const [popup, setPopup] = useState(false)

  // ---- OPEN POPUP ----
  const openPopup = () => {
    setPopup((prev) => !prev)
  }

  // ---- GET CURRENT PRICE AND FORMAT ----
  const currentPrice =
    marketcap / supply < 1 && marketcap / supply >= 0.01
      ? (marketcap / supply).toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : marketcap / supply < 0.01 && marketcap / supply >= 0.001
      ? (marketcap / supply).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : marketcap / supply < 0.001 && marketcap / supply >= 0.0001
      ? (marketcap / supply).toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : marketcap / supply < 0.0001
      ? (marketcap / supply).toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : (marketcap / supply).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

  const priceChange = () => {
    const priceCalc = (price * pricePerc24h) / (pricePerc24h + 100)
    return (priceCalc < 1 && priceCalc >= 0.01) ||
      (priceCalc > -1 && priceCalc <= -0.01)
      ? priceCalc.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (priceCalc < 0.01 && priceCalc >= 0.001) ||
        (priceCalc > -0.01 && priceCalc <= -0.001)
      ? priceCalc.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (priceCalc < 0.001 && priceCalc >= 0.0001) ||
        (priceCalc > -0.001 && priceCalc <= -0.0001)
      ? priceCalc.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : priceCalc < 0.0001 && priceCalc > -0.0001
      ? priceCalc.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : priceCalc.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }

  return (
    <div className='coin-container'>
      <div className='coin-row' onClick={openPopup}>
        <div className='coin'>
          <p className='coin-rank'>{rank}</p>
          <img src={image} alt='crypto' />
          <div className='name-symbol-wrap'>
            <h1>{name}</h1>
            <p className='coin-symbol'>{symbol}</p>
          </div>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${currentPrice}</p>
          <p className='coin-pricechange'>
            {priceChange().charAt(0) == '-' ? (
              <span className='red'>-${priceChange().substring(1)}</span>
            ) : (
              <span className='green'>+${priceChange()}</span>
            )}
          </p>
          {pricePerc24h < 0 ? (
            <p className='coin-percent'>
              <span className='coin-percent-container red-cont'>
                {pricePerc24h === null ? (
                  'unavailable'
                ) : (
                  <span className='red-cont'>
                    <i class='fas fa-arrow-down' id='coin-arrow-down'></i>{' '}
                    {pricePerc24h.toFixed(2).substring(1)}
                  </span>
                )}
                %
              </span>
            </p>
          ) : (
            <p className='coin-percent'>
              <span className='coin-percent-container green-cont'>
                {pricePerc24h === null ? (
                  'unavailable'
                ) : (
                  <span className='green-cont'>
                    <i class='fas fa-arrow-up' id='coin-arrow-up'></i>{' '}
                    {pricePerc24h.toFixed(2)}
                  </span>
                )}
                %
              </span>
            </p>
          )}
          <p className='coin-marketcap'>${marketcap.toLocaleString()}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>
        </div>
      </div>
      {popup ? (
        <Popup
          popup={popup}
          coinId={coinId}
          setPopup={setPopup}
          name={name}
          image={image}
          price={price}
          currentPrice={currentPrice}
          pricePerc24h={pricePerc24h}
          price24h={price24h}
          marketcap={marketcap}
          volume={volume}
          supply={supply}
          rank={rank}
          symbol={symbol}
          high24h={high24h}
          low24h={low24h}
        />
      ) : null}
    </div>
  )
}

export default Coin
