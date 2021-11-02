import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './Coin'
import './App.css'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/react'
import CoinSkeleton from './CoinSkeleton'

function App() {
  const [loading, setLoading] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(false)
  const [coins, setCoins] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [activeCoins, setActiveCoins] = useState([])
  const [totalMarketCap, setTotalMarketCap] = useState([])
  const [totalVolume, setTotalVolume] = useState([])
  const [dominance, setDominance] = useState([])
  const [pageId, setPageId] = useState(1)
  const [allCoins, setAllCoins] = useState([])

  // ----------------- API FETCHING -----------------
  // ------- GET COINS -------
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageId}&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((error) => console.log(error))
  }, [pageId])

  // ------- GET GLOBAL COIN DATA -------
  // Separate useEffect so it doesn't rerender and refetch on page change
  useEffect(() => {
    setGlobalLoading(true)
    axios
      .get('https://api.coingecko.com/api/v3/global')
      .then((res) => {
        setActiveCoins(res.data.data)
        setTotalMarketCap(res.data.data.total_market_cap.usd)
        setTotalVolume(res.data.data.total_volume.usd)
        setDominance(res.data.data.market_cap_percentage)
        setTimeout(() => {
          setGlobalLoading(false)
        }, 1000)
      })
      .catch((error) => console.log(error))
  }, [])

  // useEffect(() => {
  //   axios.get('https://api.coingecko.com/api/v3/coins/list').then((res) => {
  //     setAllCoins(res.data.name)
  //     console.log(res)
  //   })
  // })

  // const searchedCoins = allCoins.filter((coin) =>
  //   coin.toLowerCase().includes(searchInput.toLowerCase())
  // )

  // console.log(allCoins)

  // const handleChange = (e) => {
  //   setSearch(e.target.value)
  //   console.log('text input')
  // }

  // const filteredCoins = coins.filter((coin) =>
  //   coin.name.toLowerCase().includes(search.toLowerCase())
  // )

  // const handleChange = (e) => {
  //   setResults(true)
  //   setSearch(e.target.value)
  // }

  const handleNextPage = () => {
    setPageId(pageId + 1)
    window.scrollTo({ top: 0 })
  }

  const handlePrevPage = () => {
    setPageId(pageId - 1)
    window.scrollTo({ top: 0 })
  }

  const override = css`
    padding-top: 10rem;
  `
  const dominanceData = Object.keys(dominance)
    .map((key) => ({
      id: String(key),
      value: dominance[key],
    }))
    .slice(0, 3)

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className='app'>
      <div className='app-container'>
        <div className='coin-search'>
          <div className='coin-search-container'>
            <input
              type='text'
              placeholder='Search'
              className='coin-input'
              id='inputName'
              autocomplete='off'
              onChange={handleChange}
            />
            {searchInput !== '' ? (
              <div className='results-box'>
                <div className='result-field-wrapper'>
                  <div className='result-field'>
                    {/* {searchedCoins.slice(0, 3)} */}
                  </div>
                </div>
              </div>
            ) : null}
            {globalLoading ? (
              <div className='global-loader'>
                <div className='global-loader-container1'>
                  <div className='global-shimmer-wrapper'>
                    <div className='global-shimmer'></div>
                  </div>
                </div>
                <div className='global-loader-container2'>
                  <div className='global-shimmer-wrapper'>
                    <div className='global-shimmer'></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='global-data-container'>
                <div className='active-cryptos'>
                  <p>
                    Cryptos: <span>{activeCoins.active_cryptocurrencies}</span>
                  </p>
                  <p>
                    Market Cap:{' '}
                    <span>
                      $
                      {totalMarketCap.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </p>
                  <p>
                    24h Vol:{' '}
                    <span>
                      $
                      {totalVolume.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </p>
                </div>
                <div className='dominance-container'>
                  <div className='dominance-wrapper'>
                    Dominance:{' '}
                    {dominanceData.map((coin) => (
                      <span>
                        {coin.id.toUpperCase()}: {coin.value.toFixed(1)}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <h1 className='coin-text'>Search a currency</h1> */}
        </div>
        <div className='coin-app'>
          <div className='coin-data-label-cointainer'>
            <div className='coin-data-label-wrapper'>
              <p className='coin-rank-label'>#</p>
              <p className='coin-name-label'>Name</p>
              <div className='data-label-container'>
                <p className='coin-price-label'>Price</p>
                <p className='coin-pricechange-label'>Change (24h)</p>
                <p className='twoFour-hours-price-change-label'>24h %</p>
                <p className='market-cap-label'>Market Cap</p>
                <p className='volume-label'>Volume (24h)</p>
              </div>
            </div>
          </div>
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <CoinSkeleton key={n} />
          ))} */}
          {loading ? (
            // <BeatLoader
            //   color={'#8189A7'}
            //   loading={loading}
            //   css={override}
            //   size={10}
            // />
            [1, 2, 3].map((n) => <CoinSkeleton key={n} />)
          ) : (
            <div className='mapped-coins'>
              {coins.map((coin) => {
                return (
                  <Coin
                    key={coin.id}
                    coinId={coin.id}
                    rank={coin.market_cap_rank}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    marketcap={coin.market_cap}
                    price={coin.current_price}
                    pricePerc24h={coin.price_change_percentage_24h}
                    price24h={coin.price_change_24h}
                    volume={coin.total_volume}
                    supply={coin.circulating_supply}
                    high24h={coin.high_24h}
                    low24h={coin.low_24h}
                  />
                )
              })}
              <div className='pageButtonsContainer'>
                <div className='pageButtonsWrapper'>
                  <button onClick={handlePrevPage}>
                    <i class='fas fa-angle-left'></i>
                  </button>
                  <p className='pageNumber'>Page {pageId}</p>
                  <button onClick={handleNextPage}>
                    <i class='fas fa-angle-right'></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
