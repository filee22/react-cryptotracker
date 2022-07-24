import React, { useState, useEffect } from 'react'
import { useMountedState } from 'react-use'
import Chart from '../CoinChart/CoinChart'
import './_modal.scss'
import axios from 'axios'
import { css } from '@emotion/react'
import useLockBodyScroll from '../../Hooks/useLockBodyScroll'
import useFormatNumdata from '../../Hooks/useFormatNumData'

const Modal = (props) => {
  const [chartPrice, setChartPrice] = useState([])
  const [chartTime, setChartTime] = useState([])

  const [daysData, setDaysData] = useState(1)
  const [coinData, setCoinData] = useState([])

  const [priceSwitch, setPriceSwitch] = useState('')
  const [percSwitch, setPercSwitch] = useState('')

  // ------- LOADING ANIMATION -------
  const [loading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(false)

  // ------- ACTIVE BUTTON CLASS TOGGLE -------
  const [active, setActive] = useState('day')

  // PREVENT SCROLL WHILE MODAL OPEN
  useLockBodyScroll()

  // MODAL CLOSE BUTTON
  const handleClose = () => {
    props.setModal(false)
  }

  // ----------------- API FETCHING -----------------
  // ------- GET COIN CHART DATA FOR 1D, 7D, 30D, 200D, 1Y -------
  useEffect(async () => {
    setChartLoading(true)
    await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.coinId}/market_chart?vs_currency=usd&days=${daysData}`
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
          setChartLoading(false)
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
      .get(`https://api.coingecko.com/api/v3/coins/${props.coinId}`)
      .then((res) => {
        if (isMounted) {
          setCoinData(res.data)
          setPriceSwitch(res.data.market_data.price_change_24h)
          setPercSwitch(res.data.market_data.price_change_percentage_24h)
          console.log(res.data)
        }
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      })
  }, [props.coinId])

  //  ----------------- DISPLAY DATA TOGGLERS -----------------

  // ------- 1 DAY -------
  const oneDayData = () => {
    const oneDay = coinData.market_data.price_change_percentage_24h
    setDaysData(1)
    setActive('day')
    setPercSwitch(oneDay)
    setPriceSwitch(
      (coinData.market_data.current_price.usd * oneDay) / (oneDay + 100)
    )
  }
  // ------- 7 DAYS -------
  const sevenDaysData = () => {
    const sevenDays = coinData.market_data.price_change_percentage_7d
    setDaysData(7)
    setActive('week')
    setPercSwitch(sevenDays)
    setPriceSwitch(
      (coinData.market_data.current_price.usd * sevenDays) / (sevenDays + 100)
    )
  }

  // ------- 30 DAYS -------
  const thirtyDaysData = () => {
    const thirtyDays = coinData.market_data.price_change_percentage_30d
    setDaysData(30)
    setActive('month')
    setPercSwitch(thirtyDays)
    setPriceSwitch(
      (coinData.market_data.current_price.usd * thirtyDays) / (thirtyDays + 100)
    )
  }

  // ------- 200 DAYS -------
  const twohundredDaysData = () => {
    const twohundredDays = coinData.market_data.price_change_percentage_200d
    setDaysData(200)
    setActive('200days')
    setPercSwitch(twohundredDays)
    setPriceSwitch(
      (coinData.market_data.current_price.usd * twohundredDays) /
        (twohundredDays + 100)
    )
  }

  // ------- 1 YEAR -------
  const oneYearData = () => {
    const oneYear = coinData.market_data.price_change_percentage_1y
    setDaysData(365)
    setActive('year')
    setPercSwitch(oneYear)
    setPriceSwitch(
      (coinData.market_data.current_price.usd * oneYear) / (oneYear + 100)
    )
  }

  //  ----------------- CONDITIONS -----------------

  // ------- PREVENT PRICE FROM BEING RETURNED AS NULL -------
  // const priceCondition = useFormatNumdata(priceSwitch, 10, props.price)

  const priceCondition = () => {
    return priceSwitch == null
      ? coinData.market_data.current_price.usd
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
  }

  // ------- PREVENT 24H HIGH PRICE FROM BEING RETURNED AS NULL -------
  // const high24hCondition = useFormatNumdata(props.high24h, 1, 'unavailable')

  const high24hCondition = () => {
    return coinData.market_data.high_24h.usd == null
      ? 'unavailable'
      : (coinData.market_data.high_24h.usd < 1 &&
          coinData.market_data.high_24h.usd >= 0.01) ||
        (coinData.market_data.high_24h.usd > -1 &&
          coinData.market_data.high_24h.usd <= -0.01)
      ? coinData.market_data.high_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (coinData.market_data.high_24h.usd < 0.01 &&
          coinData.market_data.high_24h.usd >= 0.001) ||
        (coinData.market_data.high_24h.usd > -0.01 &&
          coinData.market_data.high_24h.usd <= -0.001)
      ? coinData.market_data.high_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (coinData.market_data.high_24h.usd < 0.001 &&
          coinData.market_data.high_24h.usd >= 0.0001) ||
        (coinData.market_data.high_24h.usd > -0.001 &&
          coinData.market_data.high_24h.usd <= -0.0001)
      ? coinData.market_data.high_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : coinData.market_data.high_24h.usd < 0.0001 &&
        coinData.market_data.high_24h.usd > -0.0001
      ? coinData.market_data.high_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : coinData.market_data.high_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }

  // ------- PREVENT 24H LOW PRICE FROM BEING RETURNED AS NULL -------
  // const low24hCondition = useFormatNumdata(props.low24h, 1, 'unavailable')

  const low24hCondition = () => {
    return coinData.market_data.low_24h.usd == null
      ? 'unavailable'
      : (coinData.market_data.low_24h.usd < 1 &&
          coinData.market_data.low_24h.usd >= 0.01) ||
        (coinData.market_data.low_24h.usd > -1 &&
          coinData.market_data.low_24h.usd <= -0.01)
      ? coinData.market_data.low_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : (coinData.market_data.low_24h.usd < 0.01 &&
          coinData.market_data.low_24h.usd >= 0.001) ||
        (coinData.market_data.low_24h.usd > -0.01 &&
          coinData.market_data.low_24h.usd <= -0.001)
      ? coinData.market_data.low_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : (coinData.market_data.low_24h.usd < 0.001 &&
          coinData.market_data.low_24h.usd >= 0.0001) ||
        (coinData.market_data.low_24h.usd > -0.001 &&
          coinData.market_data.low_24h.usd <= -0.0001)
      ? coinData.market_data.low_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : coinData.market_data.low_24h.usd < 0.0001 &&
        coinData.market_data.low_24h.usd > -0.0001
      ? coinData.market_data.low_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : coinData.market_data.low_24h.usd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }

  // ------- LOADING ANIMATION CSS -------
  const override = css`
    padding-top: 10rem;
  `

  // CURRENT PRICE

  const currentPrice = () => {
    return coinData.market_data.market_cap.usd /
      coinData.market_data.circulating_supply <
      1 &&
      coinData.market_data.market_cap.usd /
        coinData.market_data.circulating_supply >=
        0.01
      ? (
          coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply
        ).toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply <
          0.01 &&
        coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply >=
          0.001
      ? (
          coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply
        ).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply <
          0.001 &&
        coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply >=
          0.0001
      ? (
          coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply
        ).toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply <
        0.0001
      ? (
          coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply
        ).toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : (
          coinData.market_data.market_cap.usd /
          coinData.market_data.circulating_supply
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }

  // console.log(coinData.market_data.current_price.usd)

  return (
    <>
      <div className='modal-background'>
        <div className='modal-wrapper'>
          {loading ? (
            <div className='temp-loader'>loading</div>
          ) : (
            <>
              <div className='modal-name-chart-wrapper'>
                <div className='modal-header-details'>
                  <div className='modal-img-container'>
                    <div className='modal-image-name-wrapper'>
                      <p className='modal-coin-name'>{coinData.name}</p>
                      <img
                        className='modal-image'
                        src={coinData.image.thumb}
                        alt='crypto-image'
                      />
                    </div>
                    <p className='modal-coin-symbol'>
                      <span>Abbr:</span> {coinData.symbol.toUpperCase()}
                    </p>
                  </div>
                  <div className='modal-price-container'>
                    <div className='modal-price-wrapper'>
                      <h1 className='modal-price'>${currentPrice()}</h1>
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
                              +{priceCondition()}
                            </span>
                          ) : (
                            priceCondition()
                          )}{' '}
                          ({/* percSwitch == undefined causes crashing */}
                          {percSwitch == null || percSwitch == undefined ? (
                            <div className='modal-error-screen'>
                              <div className='modal-error-container'>
                                <img src='./doge_error.png' alt='error img' />
                                <p>
                                  Oh heck! The API is messing up, please close
                                  the window and try again.
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
                          {coinData.market_data.price_change_percentage_1y ==
                          0 ? (
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
                {chartLoading ? (
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
                      name={coinData.name}
                      pricePerc24h={
                        coinData.market_data.price_change_percentage_24h
                      }
                      priceCondition={priceCondition()}
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
                      <span>24h Low / 24h High</span>${low24hCondition()} / $
                      {high24hCondition()}
                    </div>
                  </div>
                  <div className='modal-coin-detail-container'>
                    <div className='modal-coin-detail-wrapper'>
                      <span>Market Cap</span>$
                      {coinData.market_data.market_cap.usd.toLocaleString()}
                    </div>
                  </div>
                  <div className='modal-coin-detail-container'>
                    <div className='modal-coin-detail-wrapper'>
                      <span>Volume</span>$
                      {coinData.market_data.total_volume.usd.toLocaleString()}
                    </div>
                  </div>
                  <div className='modal-coin-detail-container'>
                    <div className='modal-coin-detail-wrapper'>
                      <span>Circulating supply</span>
                      {coinData.market_data.circulating_supply.toLocaleString()}{' '}
                      {coinData.symbol.toUpperCase()}
                    </div>
                  </div>
                  <div className='modal-coin-detail-container'>
                    <div className='modal-coin-detail-wrapper'>
                      <span>Market Rank</span>#
                      {coinData.market_data.market_cap_rank}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
