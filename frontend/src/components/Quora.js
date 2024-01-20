import React from 'react'
import Feed from './Feed'
import Quora_header from './quora_header'
import Sidebar from './Sidebar'
import Widget from './Widget'
import './css/quora.css'

function Quora() {
  return (
    <div className='quora'>
      <Quora_header/>
      <div className='quora__contents'>
        <div className='quora__content'>
            <Sidebar/>
            <Feed/>
            <Widget/>
        </div>
    </div>
    </div>
  )
}

export default Quora
