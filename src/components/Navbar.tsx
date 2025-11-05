import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Furniture Manager
          </Link>
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="hover:bg-blue-700 px-3 py-2 rounded"
            >
              Furniture
            </Link>
            <Link 
              to="/providers" 
              className="hover:bg-blue-700 px-3 py-2 rounded"
            >
              Providers
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
