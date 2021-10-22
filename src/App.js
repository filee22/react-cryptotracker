import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './Coin'
import './App.css'
import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/react'

function App() {
  const [loading, setLoading] = useState(false)
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [coinNum, setCoinNum] = useState('')
  const [pageId, setPageId] = useState(1)

  // ----------------- API FETCHING -----------------
  useEffect(() => {
    setLoading(true)
    const fetchCoins = () => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageId}&sparkline=false`
        )
        .then((res) => {
          setCoins(res.data)
          console.log(res)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
        .catch((error) => console.log(error))
    }
    fetchCoins()

    // ----- NUMBER OF TRACKED COINS (FOR PAGE NUMBER MAPPING) -----
    const fetchCoinList = () => {
      axios
        .get('https://api.coingecko.com/api/v3/global')
        .then((res) => {
          setCoinNum(res.data.data.active_cryptocurrencies)
          console.log(res.data)
        })
        .catch((error) => console.log(error))
    }
    fetchCoinList()
  }, [pageId])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

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

  return (
    <div className='app'>
      <div className='app-container'>
        <div className='coin-search'>
          <div className='coin-search-container'>
            <form>
              <input
                type='text'
                placeholder='Search'
                className='coin-input'
                onChange={handleChange}
              />
            </form>
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
                <p className='coin-pricechange-label'>Change</p>
                <p className='twoFour-hours-price-change-label'>24h %</p>
                <p className='market-cap-label'>Market Cap</p>
                <p className='volume-label'>Volume (24h)</p>
              </div>
            </div>
          </div>
          {loading ? (
            <BeatLoader
              color={'#8189A7'}
              loading={loading}
              css={override}
              size={10}
            />
          ) : (
            <div className='mapped-coins'>
              {filteredCoins.map((coin) => {
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
