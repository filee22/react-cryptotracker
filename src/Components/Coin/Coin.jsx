import React, { useState } from 'react'
import './_coin.scss'
import Modal from '../Modal/Modal'
import useClickOutside from '../../Hooks/useClickOutside'
import useFormatNumdata from '../../Hooks/useFormatNumData'

const Coin = (props) => {
  const [modal, setModal] = useState(false)

  // ---- OPEN & CLOSE MODAL ----
  const openModal = () => {
    setModal((prev) => !prev)
  }

  const closeModalOutside = useClickOutside(() => {
    setModal(false)
  })

  // ---- GET CURRENT PRICE AND FORMAT ----
  const currentPrice =
    props.marketcap / props.supply < 1 && props.marketcap / props.supply >= 0.01
      ? (props.marketcap / props.supply).toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : props.marketcap / props.supply < 0.01 &&
        props.marketcap / props.supply >= 0.001
      ? (props.marketcap / props.supply).toLocaleString(undefined, {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })
      : props.marketcap / props.supply < 0.001 &&
        props.marketcap / props.supply >= 0.0001
      ? (props.marketcap / props.supply).toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : props.marketcap / props.supply < 0.0001
      ? (props.marketcap / props.supply).toLocaleString(undefined, {
          minimumFractionDigits: 8,
          maximumFractionDigits: 8,
        })
      : (props.marketcap / props.supply).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

  // PRICE CHANGE FORMAT
  const priceCalc =
    (props.price * props.pricePerc24h) / (props.pricePerc24h + 100)

  const priceChange = useFormatNumdata(priceCalc, 1, 'unavailable')

  return (
    <div className='coin-container'>
      <div className='coin-row' onClick={openModal}>
        <div className='coin'>
          <p className='coin-rank'>{props.rank}</p>
          <img src={props.image} alt='crypto' />
          <div className='name-symbol-wrap'>
            <h1>{props.name}</h1>
            <p className='coin-symbol'>{props.symbol}</p>
          </div>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${currentPrice}</p>
          <p className='coin-pricechange'>
            {priceChange.charAt(0) == '-' ? (
              <span className='red'>-${priceChange.substring(1)}</span>
            ) : (
              <span className='green'>+${priceChange}</span>
            )}
          </p>
          {props.pricePerc24h < 0 ? (
            <p className='coin-percent'>
              <span className='coin-percent-container red-cont'>
                {props.pricePerc24h === null ? (
                  'unavailable'
                ) : (
                  <span className='red-cont'>
                    <i class='fas fa-arrow-down' id='coin-arrow-down'></i>{' '}
                    {props.pricePerc24h.toFixed(2).substring(1)}
                  </span>
                )}
                %
              </span>
            </p>
          ) : (
            <p className='coin-percent'>
              <span className='coin-percent-container green-cont'>
                {props.pricePerc24h === null ? (
                  'unavailable'
                ) : (
                  <span className='green-cont'>
                    <i class='fas fa-arrow-up' id='coin-arrow-up'></i>{' '}
                    {props.pricePerc24h.toFixed(2)}
                  </span>
                )}
                %
              </span>
            </p>
          )}
          <p className='coin-marketcap'>${props.marketcap.toLocaleString()}</p>
          <p className='coin-volume'>${props.volume.toLocaleString()}</p>
        </div>
      </div>
      {modal ? (
        <div className='modal--container'>
          <div className='modal--wrapper' ref={closeModalOutside}>
            <Modal coinId={props.coinId} modal={modal} setModal={setModal} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Coin
