import React from 'react'

import {Navbar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <div text style={{marginTop: '8em'}}>
        <Routes />
      </div>
    </div>
  )
}

export default App
