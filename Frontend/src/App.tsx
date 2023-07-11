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
                    <Route path="/infoproduct/:id" element={<InfoProduct />} />
                    <Route path="/brand" element={<BrandList />} />
                    <Route path="/infobrand/:id" element={<InfoBrand />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
