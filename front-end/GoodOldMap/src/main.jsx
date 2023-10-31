import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TimelineBar from './components/timeline/TimelineBar.jsx'
import './embla.css'
import EmblaCarousel from './components/timeline/Picker.jsx'

const LOOP = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
      {/* <EmblaCarousel loop={LOOP} />
    <div className='content-center ml-10 mt-16'><TimelineBar></TimelineBar></div> */}
  </React.StrictMode>
)
