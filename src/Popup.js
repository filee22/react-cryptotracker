import React, { useState, useEffect } from 'react'
import { useMountedState } from 'react-use'
import CoinChart from './CoinChart'
import './Popup.css'
import axios from 'axios'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/react'
import { ClimbingBoxLoader } from 'react-spinners'

// ---- TODO: FIX POPUP SO IT DOESNT RENDER ALL INSTANCES IN DOM, ONLY WHEN CLICK
// ---- TODO: CHANGE BY MAPPING THROUGH CHART DATA AND RETURNING ARRAY MIN AND MAX
// ---- TODO: CREATE REUSABLE COMPONENT
// ---- TODO: Add useContext to pass down props better
// ---- TODO: Fix percSwitch undefined (ASYNC PROBLEM)

function Popup({
  coinId,
  setPopup,
  image,
  name,
  price,
  currentPrice,
  pricePerc24h,
  price24h,
  marketcap,
  volume,
  supply,
  rank,
  symbol,
  high24h,
  low24h,
}) {
  const [chartPrice, setChartPrice] = useState([])
  const [chartTime, setChartTime] = useState([])

  const [daysData, setDaysData] = useState(1)
  const [detailsData, setDetailsData] = useState([])

  const [priceSwitch, setPriceSwitch] = useState(price24h)
  const [percSwitch, setPercSwitch] = useState(pricePerc24h)

  // ------- CHART LOADING ANIMATION -------
  const [loading, setLoading] = useState(false)

  // ------- ACTIVE BUTTON CLASS TOGGLE -------
  const [active, setActive] = useState('day')

  // ----------------- API FETCHING -----------------
  // ------- GET COIN CHART DATA FOR 1D, 7D, 30D, 200D, 1Y -------
  useEffect(async () => {
    setLoading(true)
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${daysData}`
      )
      .then((res) => {
        setChartPrice(res.data.prices.map((el) => [el[1]]))
        setChartTime(
          res.data.prices.map((el) =>
            daysData > 1
              ? [new Date(el[0]).toString().substr(4, 6)]
              : [new Date(el[0]).toString().substr(16, 5)]
          )
        )
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      })
      .catch((error) => console.log(error))
  }, [daysData])

  // ------- GET COIN MARKET DATA -------
  // Separate useEffect used to prevent refetching when using time specific togglers (1d, 7d etc)
  // Fetch coin market data only on open popup

  // --- Cleanup memory leaks on an Unmounted Component ---
  const isMounted = useMountedState()

  useEffect(async () => {
    await axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)

      .then((result) => {
        if (isMounted) {
          setDetailsData(result.data.market_data)
          console.log(result.data.market_data)
        }
      })

    // await axios
    //   .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    //   .then((res) => {
    //     setDetailsData(res.data.market_data)
    //   })
    //   .catch((error) => console.log(error))
  }, [coinId])

  //  ----------------- DISPLAY DATA TOGGLERS -----------------
  // TODO: Create reusable button component which uses the dayData function
  // while using object data (store day data into object)

  // ------- 1 DAY -------
  const oneDayData = () => {
    const oneDay = detailsData.price_change_percentage_24h
    setDaysData(1)
    setActive('day')
    setPercSwitch(pricePerc24h)
    setPriceSwitch((price * oneDay) / (oneDay + 100))
  }
  // ------- 7 DAYS -------
  const sevenDaysData = () => {
    const sevenDays = detailsData.price_change_percentage_7d
    setDaysData(7)
    setActive('week')
    setPercSwitch(sevenDays)
    setPriceSwitch((price * sevenDays) / (sevenDays + 100))
  }

  // ------- 30 DAYS -------
  const thirtyDaysData = () => {
    const thirtyDays = detailsData.price_change_percentage_30d
    setDaysData(30)
    setActive('month')
    setPercSwitch(thirtyDays)
    setPriceSwitch((price * thirtyDays) / (thirtyDays + 100))
  }

  // ------- 200 DAYS -------
  const twohundredDaysData = () => {
    const twohundredDays = detailsData.price_change_percentage_200d
    setDaysData(200)
    setActive('200days')
    setPercSwitch(twohundredDays)
    setPriceSwitch((price * twohundredDays) / (twohundredDays + 100))
  }

  // ------- 1 YEAR -------
  const oneYearData = () => {
    const oneYear = detailsData.price_change_percentage_1y
    setDaysData(365)
    setActive('year')
    setPercSwitch(oneYear)
    setPriceSwitch((price * oneYear) / (oneYear + 100))
  }

  //  ----------------- CONDITIONS -----------------

  // ------- PREVENT PRICE FROM BEING RETURNED AS NULL -------
  const priceCondition =
    priceSwitch == null
      ? price
      : (priceSwitch < 10 && priceSwitch >= 0.01) ||
        (priceSwitch > -10 && priceSwitch <= -0.01)
      ? priceSwitch.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (priceSwitch < 0.01 && priceSwitch >= 0.001) ||
        (priceSwitch > -0.01 && priceSwitch <= -0.001)
      ? priceSwitch.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (priceSwitch < 0.001 && priceSwitch >= 0.0001) ||
        (priceSwitch > -0.001 && priceSwitch <= -0.0001)
      ? priceSwitch.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : priceSwitch < 0.0001 && priceSwitch > -0.0001
      ? priceSwitch.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : priceSwitch.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

  console.log(percSwitch)

  // ------- PREVENT 24H HIGH PRICE FROM BEING RETURNED AS NULL -------
  const high24hCondition =
    high24h == null
      ? 'unavailable'
      : (high24h < 1 && high24h >= 0.01) || (high24h > -1 && high24h <= -0.01)
      ? high24h.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (high24h < 0.01 && high24h >= 0.001) ||
        (high24h > -0.01 && high24h <= -0.001)
      ? high24h.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (high24h < 0.001 && high24h >= 0.0001) ||
        (high24h > -0.001 && high24h <= -0.0001)
      ? high24h.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : high24h < 0.0001 && high24h > -0.0001
      ? high24h.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : high24h.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

  // ------- PREVENT 24H LOW PRICE FROM BEING RETURNED AS NULL -------
  const low24hCondition =
    low24h == null
      ? 'unavailable'
      : (low24h < 1 && low24h >= 0.01) || (low24h > -1 && low24h <= -0.01)
      ? low24h.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (low24h < 0.01 && low24h >= 0.001) ||
        (low24h > -0.01 && low24h <= -0.001)
      ? low24h.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (low24h < 0.001 && low24h >= 0.0001) ||
        (low24h > -0.001 && low24h <= -0.0001)
      ? low24h.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : low24h < 0.0001 && low24h > -0.0001
      ? low24h.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : low24h.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

  // ------- LOADING ANIMATION CSS -------
  const override = css`
    padding-top: 10rem;
  `

  return (
    <>
      <div className='popup-background'>
        <div className='popup-wrapper'>
          <div className='popup-name-chart-wrapper'>
            <div className='popup-header-details'>
              <div className='popup-img-container'>
                <div className='popup-image-name-wrapper'>
                  <p className='popup-coin-name'>{name}</p>
                  <img className='popup-image' src={image} alt='crypto-image' />
                </div>
                <p className='popup-coin-symbol'>
                  <span>Abbr:</span> {symbol.toUpperCase()}
                </p>
              </div>
              <div className='popup-price-container'>
                <div className='popup-price-wrapper'>
                  <h1 className='popup-price'>${currentPrice}</h1>
                </div>
              </div>
              <div className='popup-pricechange-container'>
                <div className='popup-pricechange-wrapper'>
                  <div className='popup-pricechange'>
                    <p
                      className={
                        percSwitch > 0
                          ? 'popup-price-change green-popup'
                          : 'popup-price-change red-popup'
                      }
                    >
                      {/* {percSwitch > 0 ? '+' : '-'} */}
                      {percSwitch > 0 ? (
                        <span className='price-positive'>
                          +{priceCondition}
                        </span>
                      ) : (
                        priceCondition
                      )}{' '}
                      ({/* percSwitch == undefined causes crashing */}
                      {percSwitch == null || percSwitch == undefined ? (
                        <div className='popup-error-screen'>
                          <div className='popup-error-container'>
                            <img src='./doge_error.png' alt='error img' />
                            <p>
                              Oh heck! The API is messing up, please close the
                              window and try again.
                            </p>
                          </div>
                        </div>
                      ) : percSwitch > 0 ? (
                        percSwitch.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      ) : (
                        percSwitch
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          .substr(1, 4)
                      )}
                      %){' '}
                      {percSwitch > 0 ? (
                        <i class='fas fa-arrow-up' id='arrow-up'></i>
                      ) : (
                        <i class='fas fa-arrow-down' id='arrow-down'></i>
                      )}{' '}
                      {daysData == 1
                        ? 'past 24h'
                        : daysData == 7
                        ? 'past week'
                        : daysData == 14
                        ? 'past two weeks'
                        : daysData == 30
                        ? 'past month'
                        : daysData == 200
                        ? 'past 200d'
                        : 'past year'}
                    </p>
                    <div
                      className={
                        percSwitch > 0
                          ? 'chartButtons-green'
                          : 'chartButtons-red'
                      }
                    >
                      <button
                        className={
                          active == 'day'
                            ? percSwitch > 0
                              ? 'active-button-green'
                              : 'active-button-red'
                            : 'inactive-button'
                        }
                        onClick={oneDayData}
                      >
                        1D
                      </button>
                      <button
                        className={
                          active == 'week'
                            ? percSwitch > 0
                              ? 'active-button-green'
                              : 'active-button-red'
                            : 'inactive-button'
                        }
                        onClick={sevenDaysData}
                      >
                        7D
                      </button>
                      <button
                        className={
                          active == 'month'
                            ? percSwitch > 0
                              ? 'active-button-green'
                              : 'active-button-red'
                            : 'inactive-button'
                        }
                        onClick={thirtyDaysData}
                      >
                        30D
                      </button>
                      {detailsData.price_change_percentage_1y == 0 ? (
                        <button
                          className={
                            active == '200days'
                              ? percSwitch > 0
                                ? 'active-button-green'
                                : 'active-button-red'
                              : 'inactive-button'
                          }
                          onClick={twohundredDaysData}
                        >
                          200D
                        </button>
                      ) : (
                        <button
                          className={
                            active == 'year'
                              ? percSwitch > 0
                                ? 'active-button-green'
                                : 'active-button-red'
                              : 'inactive-button'
                          }
                          onClick={oneYearData}
                        >
                          1Y
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <div className='loader-container'>
                {/* <BeatLoader
                  // color={percSwitch > 0 ? '#08B089' : '#FF6384'}
                  color={'#8189A7'}
                  loading={loading}
                  css={override}
                  size={10}
                /> */}
                <div className='shimmer-wrapper'>
                  <div className='shimmer'></div>
                </div>
              </div>
            ) : (
              <div className='chart-wrapper'>
                <CoinChart
                  className='chart'
                  priceData={chartPrice.flat()}
                  timeData={chartTime}
                  name={name}
                  pricePerc24h={pricePerc24h}
                  priceCondition={priceCondition}
                  percSwitch={percSwitch}
                />
              </div>
            )}
          </div>
          <div className='popup-coin-info-wrapper'>
            <button onClick={() => setPopup(false)}>
              <i id='close-btn' class='fas fa-times'></i>
            </button>
            <div className='popup-coin-info-container'>
              {/* ------CAN MAKE REUSABLE COMPONENT------- */}
              <div className='popup-coin-detail-container'>
                <div className='popup-coin-detail-wrapper'>
                  <span>24h Low / 24h High</span>${low24hCondition} / $
                  {high24hCondition}
                </div>
              </div>
              <div className='popup-coin-detail-container'>
                <div className='popup-coin-detail-wrapper'>
                  <span>Market Cap</span>${marketcap.toLocaleString()}
                </div>
              </div>
              <div className='popup-coin-detail-container'>
                <div className='popup-coin-detail-wrapper'>
                  <span>Volume</span>${volume.toLocaleString()}
                </div>
              </div>
              <div className='popup-coin-detail-container'>
                <div className='popup-coin-detail-wrapper'>
                  <span>Circulating Supply</span>
                  {supply.toLocaleString()} {symbol.toUpperCase()}
                </div>
              </div>
              <div className='popup-coin-detail-container'>
                <div className='popup-coin-detail-wrapper'>
                  <span>Market Rank</span>#{rank}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
