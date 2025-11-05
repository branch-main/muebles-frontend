import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import furnitureService from '../services/furnitureService';
import type { Furniture } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const MEDIA_BASE_URL = API_BASE_URL.replace('/api/v1', '');

export default function FurnitureList() {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFurniture = async () => {
    try {
      setLoading(true);
      const response = await furnitureService.getAll();
      setFurniture(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load furniture');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await furnitureService.delete(id);
      await loadFurniture();
    } catch (err) {
      alert('Failed to delete furniture');
      console.error(err);
    }
  };

  useEffect(() => {
    loadFurniture();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Furniture</h1>
        <Link
          to="/furniture/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Furniture
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {furniture.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.image.startsWith('http') ? item.image : `${MEDIA_BASE_URL}${item.image}`}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">Provider: {item.provider_name}</p>
              <p className="text-gray-600">Material: {item.material}</p>
              <p className="text-gray-600">Stock: {item.stock}</p>
              <p className="text-2xl font-bold text-green-600 mt-2">${item.price}</p>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/furniture/edit/${item.id}`}
                  className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded text-center hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {furniture.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No furniture found</p>
      )}
    </div>
  );
}
