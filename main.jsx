import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// remove preloader once the app has mounted
function removePreloader(){
  const pre = document.getElementById('preloader')
  if(!pre) return
  // give a tiny delay so users see the animation briefly
  setTimeout(() => {
    pre.classList.add('fade-out')
    setTimeout(() => pre.remove(), 500)
  }, 250)
}

// If React hydrates/loads synchronously this runs quickly; otherwise run on DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  removePreloader()
} else {
  window.addEventListener('DOMContentLoaded', removePreloader)
}
