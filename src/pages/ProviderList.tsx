import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import providerService from "../services/providerService";
import type { Provider } from "../types";

export default function ProviderList() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const response = await providerService.getAll();
      const data = response.data;
      // Ensure we always have an array
      setProviders(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError("Failed to load providers");
      console.error(err);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this provider?")) return;
    try {
      await providerService.delete(id);
      await loadProviders();
    } catch (err) {
      alert("Failed to delete provider");
      console.error(err);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Providers</h1>
        <Link
          to="/providers/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Provider
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div key={provider.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{provider.name}</h2>
            <p className="text-gray-600">City: {provider.city}</p>
            <p className="text-gray-600">Phone: {provider.phone}</p>
            <p className="text-gray-600">Email: {provider.email}</p>
            <div className="flex gap-2 mt-4">
              <Link
                to={`/providers/edit/${provider.id}`}
                className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded text-center hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(provider.id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {providers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No providers found</p>
      )}
    </div>
  );
}
