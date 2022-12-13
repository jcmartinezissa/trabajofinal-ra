import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PagesAdmin from './pages/PagesAdmin/PagesAdmin.jsx';
import LoginPages from './pages/LoginPage/LoginPages.jsx';

function App() {
  return (
    <BrowserRouter>
                <Routes>
            <Route path="/" element={<LoginPages />} />
            <Route path="/admin" element={<PagesAdmin />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
