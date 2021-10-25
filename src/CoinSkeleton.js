import React from 'react'
import './CoinSkeleton.css'

const CoinSkeleton = () => {
  return (
    <div className='coin-loader'>
      <div className='coin-loader-container rank-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container name-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container price-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container change-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container perc-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container mcap-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
      <div className='coin-loader-container vol-load'>
        <div className='coin-shimmer-wrapper'>
          <div className='coin-shimmer'></div>
        </div>
      </div>
    </div>
  )
}

export default CoinSkeleton
