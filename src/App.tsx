import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/ReactToastify.css'
function App() {
  const routeElements = useRouteElement()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
