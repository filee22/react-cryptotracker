import './_result.scss'
import useClickOutside from '../../Hooks/useClickOutside'
import Modal from '../Modal/Modal'
import { useState } from 'react'

const Result = (props) => {
  const [modal, setModal] = useState(false)

  // ---- OPEN & CLOSE MODAL ----
  const openModal = () => {
    setModal((prev) => !prev)
  }

  const closeModalOutside = useClickOutside(() => {
    setModal(false)
  })

  return (
    <div>
      <div className='result-wrapper' onClick={openModal}>
        <div className='result-item'>
          <img src={props.coin.thumb} alt='' className='result-thumb' />
          <span className='result-name'>{props.coin.name}</span>
          <span className='result-symbol'>{props.coin.symbol}</span>
        </div>
        <div className='result-rank'>#{props.coin.market_cap_rank}</div>
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

export default Result
