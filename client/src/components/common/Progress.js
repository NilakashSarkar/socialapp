import React from 'react'
import Progress from './progress.gif'
export default ()=> {
  return (
    <div>
    <img src={Progress}style={{width:'200px', margin:'auto' , display:'block' }}
    alt='loading...'></img>
    </div>
  )
  }