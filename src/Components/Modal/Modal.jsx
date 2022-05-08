import React, { useState, useEffect } from 'react'
import { useMountedState } from 'react-use'
import Chart from '../CoinChart/CoinChart'
import './_modal.scss'
import axios from 'axios'
import { css } from '@emotion/react'
import useLockBodyScroll from '../../Hooks/useLockBodyScroll'
import useFormatNumdata from '../../Hooks/useFormatNumData'

const Modal = ({
  coinId,
  setModal,
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
}) => {
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

  // PREVENT SCROLL WHILE MODAL OPEN
  useLockBodyScroll()

  // MODAL CLOSE BUTTON
  const handleClose = () => {
    setModal(false)
  }

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
              ? [new Date(el[0]).toString().substring(4, 10)]
              : [new Date(el[0]).toString().substring(16, 21)]
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
  // Fetch coin market data only on open modal

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
  }, [coinId])

  //  ----------------- DISPLAY DATA TOGGLERS -----------------

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
  const priceCondition = useFormatNumdata(priceSwitch, 10, price)

  // ------- PREVENT 24H HIGH PRICE FROM BEING RETURNED AS NULL -------
  const high24hCondition = useFormatNumdata(high24h, 1, 'unavailable')

  // ------- PREVENT 24H LOW PRICE FROM BEING RETURNED AS NULL -------
  const low24hCondition = useFormatNumdata(low24h, 1, 'unavailable')

  // ------- LOADING ANIMATION CSS -------
  const override = css`
    padding-top: 10rem;
  `

  return (
    <>
      <div className='modal-background'>
        <div className='modal-wrapper'>
          <div className='modal-name-chart-wrapper'>
            <div className='modal-header-details'>
              <div className='modal-img-container'>
                <div className='modal-image-name-wrapper'>
                  <p className='modal-coin-name'>{name}</p>
                  <img className='modal-image' src={image} alt='crypto-image' />
                </div>
                <p className='modal-coin-symbol'>
                  <span>Abbr:</span> {symbol.toUpperCase()}
                </p>
              </div>
              <div className='modal-price-container'>
                <div className='modal-price-wrapper'>
                  <h1 className='modal-price'>${currentPrice}</h1>
                </div>
              </div>
              <div className='modal-pricechange-container'>
                <div className='modal-pricechange-wrapper'>
                  <div className='modal-pricechange'>
                    <p
                      className={
                        percSwitch > 0
                          ? 'modal-price-change green-modal'
                          : 'modal-price-change red-modal'
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
                        <div className='modal-error-screen'>
                          <div className='modal-error-container'>
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
                <div className='shimmer-wrapper'>
                  <div className='shimmer'></div>
                </div>
              </div>
            ) : (
              <div className='chart-wrapper'>
                <Chart
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
          <div className='modal-coin-info-wrapper'>
            <button onClick={handleClose}>
              <i id='close-btn' class='fas fa-times'></i>
            </button>
            <div className='modal-coin-info-container'>
              {/* ------CAN MAKE REUSABLE COMPONENT------- */}
              <div className='modal-coin-detail-container'>
                <div className='modal-coin-detail-wrapper'>
                  <span>24h Low / 24h High</span>${low24hCondition} / $
                  {high24hCondition}
                </div>
              </div>
              <div className='modal-coin-detail-container'>
                <div className='modal-coin-detail-wrapper'>
                  <span>Market Cap</span>${marketcap.toLocaleString()}
                </div>
              </div>
              <div className='modal-coin-detail-container'>
                <div className='modal-coin-detail-wrapper'>
                  <span>Volume</span>${volume.toLocaleString()}
                </div>
              </div>
              <div className='modal-coin-detail-container'>
                <div className='modal-coin-detail-wrapper'>
                  <span>Circulating Supply</span>
                  {supply.toLocaleString()} {symbol.toUpperCase()}
                </div>
              </div>
              <div className='modal-coin-detail-container'>
                <div className='modal-coin-detail-wrapper'>
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

export default Modal
