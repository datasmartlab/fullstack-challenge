import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { DefaultLayout } from './layouts/DefaultLayout';
import { InfoProduct } from './pages/InfoProduct';
import { BrandList } from './pages/BrandList';
import { InfoBrand } from './pages/InfoBrand';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/infoProduct/:id" element={<InfoProduct />} />
                    <Route path="/marca" element={<BrandList />} />
                    <Route path="/marca/:id" element={<InfoBrand />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
