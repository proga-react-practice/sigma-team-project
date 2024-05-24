import { useEffect } from 'react'
import { preLoaderAnim } from '../utils/animationHomePage'
// import React from 'react'
import './preloader.css'

const HomePreloader = () => {
    useEffect(() => {
        preLoaderAnim()
    }, [])


  return (
    <div className='preloader'>
        <div className='texts-container'>
            <span>WELCOME</span>
            <span>TO</span>
            <span>SIGMA TEAM</span>
            <span>PROJECT</span>
        </div>
    </div>
  )
}

export default HomePreloader
