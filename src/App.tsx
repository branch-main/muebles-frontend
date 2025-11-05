import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import FurnitureList from './pages/FurnitureList';
import FurnitureForm from './pages/FurnitureForm';
import ProviderList from './pages/ProviderList';
import ProviderForm from './pages/ProviderForm';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<FurnitureList />} />
            <Route path="/furniture/create" element={<FurnitureForm />} />
            <Route path="/furniture/edit/:id" element={<FurnitureForm />} />
            <Route path="/providers" element={<ProviderList />} />
            <Route path="/providers/create" element={<ProviderForm />} />
            <Route path="/providers/edit/:id" element={<ProviderForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
