import React from 'react'

import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import ChatProvider from './Context/ChatProvider'
import store from './store'
import './bootstrap.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
// import './assets/css/grid.css'
// import './assets/css/theme.css'
import './assets/css/index.css'

import Layout from './components/layout/Layout'

document.title = 'eCom-NLH'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ChatProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </ChatProvider>
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
