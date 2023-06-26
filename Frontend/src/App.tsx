import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { FormProduct } from './pages/FormAddProduct'
import { InfoProduct } from './pages/InfoProduct'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
          <Route path='/' element={ <Home /> } />
          <Route path='/infoProduct' element={ <InfoProduct /> } />
          <Route path='/addProduct' element={ <FormProduct /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
