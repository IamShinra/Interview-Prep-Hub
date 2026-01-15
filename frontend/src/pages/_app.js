import React from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../app/store'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        pauseOnHover={false}
        duratioautoClose={5000}
      />
    </Provider>
  </>
}

export default App
// export default function App({ Component, pageProps }) {
//     return (
//         <Component {...pageProps} />
//     )
// }