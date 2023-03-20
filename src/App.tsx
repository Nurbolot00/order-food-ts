import store from './store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './routes'

function AppContent() {
  return <div>
    <AppRoutes/>
  </div>
}


const App = () =>{
  return(
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App
