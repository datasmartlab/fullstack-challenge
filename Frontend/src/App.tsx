import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { DefaultLayout } from './layouts/MainLayout';
import { InfoProduct } from './pages/InfoProduct';
import { BrandList } from './pages/BrandList';
import { InfoBrand } from './pages/InfoBrand';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<InfoProduct />} />
                    <Route path="/brand" element={<BrandList />} />
                    <Route path="/brand/:id" element={<InfoBrand />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
