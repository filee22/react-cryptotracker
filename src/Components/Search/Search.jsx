import { useEffect, useState } from 'react'
import './_search.scss'
import PuffLoader from 'react-spinners/PuffLoader'
import axios from 'axios'
import Result from '../Result/Result'
import useClickOutside from '../../Hooks/useClickOutside'
import useLockBodyScroll from '../../Hooks/useLockBodyScroll'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchToSend, setSearchToSend] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [searchDropDown, setSearchDropDown] = useState(false)

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${searchInput}`)
      .then((res) => {
        setSearchResult(res.data.coins.slice(0, 5))

        // searchInput !== '' ? setSearchDropDown(true) : setSearchDropDown(false)

        // console.log(res.data.coins)
      })
  }, [searchToSend])

  useEffect(() => {
    const delaySearchUpdate = setTimeout(() => {
      setSearchToSend(searchInput)
    }, 750)

    return () => clearTimeout(delaySearchUpdate)
  }, [searchInput])

  // SET SEARCH
  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  console.log(searchResult)

  const closeSearchOutside = useClickOutside(() => {
    setSearchDropDown(false)
  })

  const handleClose = () => {
    setSearchDropDown(false)
  }

  return (
    <div className='search-container'>
      <div className='search-icon-wrapper'>
        <img
          src='./doge_logo.png'
          className='nav-mobile-logo'
          alt='error img'
        />
        <span className='search-icon'>
          <i class='fas fa-search' onClick={() => setSearchDropDown(true)}></i>
        </span>
      </div>
      <div className='search-wrapper'>
        <input
          type='text'
          placeholder='Search'
          className='coin-input'
          id='inputName'
          autocomplete='off'
          onChange={handleChange}
          onClick={() => setSearchDropDown(true)}
        />
        {searchDropDown ? (
          <div className='results-box-container' ref={closeSearchOutside}>
            <div className='results-box'>
              <div className='result-field-wrapper'>
                <div className='search-cancel-wrapper'>
                  <input
                    type='text'
                    placeholder='Search'
                    className='coin-input-mobile'
                    id='inputName'
                    autocomplete='off'
                    onChange={handleChange}
                    onClick={() => setSearchDropDown(true)}
                  />
                  <button className='search-cancel-btn' onClick={handleClose}>
                    Cancel
                  </button>
                </div>
                <div className='result-field'></div>
              </div>
              {/* <div className='search-loader'>
            <PuffLoader color={'#8189A7'} size={50} />
          </div> */}
              <div className='results-test'>
                {searchResult.map((coin) => (
                  <Result key={coin.id} coinId={coin.id} coin={coin} />
                ))}
              </div>
              {/* <div className='search-error-container'>
            <img src='./doge_error.png' alt='error img' />
            <p>Oh heck! The search bar is not working yet!</p>
          </div> */}
            </div>
            <button className='search-close-btn' onClick={handleClose}>
              <i id='close-btn' class='fas fa-times'></i>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Search
