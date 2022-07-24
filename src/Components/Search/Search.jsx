import { useEffect, useState } from 'react'
import './_search.scss'
import PuffLoader from 'react-spinners/PuffLoader'
import axios from 'axios'
import Result from '../Result/Result'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${searchInput}`)
      .then((res) => {
        if (res.data.coins.length > 100) {
          return null
        } else {
          setSearchResult(res.data.coins.slice(0, 5))
        }

        // console.log(res.data.coins)
      })
  }, [searchInput])

  // SET SEARCH
  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  console.log(searchResult)

  return (
    <div>
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
      ) : null}
    </div>
  )
}

export default Search
