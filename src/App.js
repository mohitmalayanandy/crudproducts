import React, { useEffect, useState } from 'react'

const API_URL = "https://dummyjson.com/products";
const ADD_URL = "https://dummyjson.com/products/add";
const UPDATE_URL = "https://dummyjson.com/products/1"; 

const App = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    category: '',
    thumbnail: '',
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(API_URL);
    const result = await response.json();
    setData(result.products.slice(0, 20));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (editingProductId) {
      await updateProduct(editingProductId);
    } else {
      const response = await fetch(ADD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      setData((prevData) => [...prevData, result]);
    }

    closeModal();
  };

  const updateProduct = async (id) => {
    const response = await fetch(UPDATE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const updatedProduct = await response.json();
    setData((prevData) =>
      prevData.map((product) =>
        product.id === id ? updatedProduct : product
      )
    );
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      category: product.category,
      thumbnail: product.thumbnail,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProductId(null);
    setIsModalOpen(false);
    setNewProduct({
      title: '',
      price: '',
      discountPercentage: '',
      rating: '',
      stock: '',
      category: '',
      thumbnail: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Product List</h1>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={addProduct} className="space-y-4">
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="discountPercentage"
                value={newProduct.discountPercentage}
                onChange={handleChange}
                placeholder="Discount Percentage"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="rating"
                value={newProduct.rating}
                onChange={handleChange}
                placeholder="Rating"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="thumbnail"
                value={newProduct.thumbnail}
                onChange={handleChange}
                placeholder="Thumbnail URL"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                  {editingProductId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div key={product.id} className="p-6 bg-white text-black rounded-xl shadow-xl">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mt-4 rounded-lg shadow-md" />
            <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
            <p>Price: $ {product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Rating: {product.rating}⭐</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <button
              onClick={() => handleEdit(product)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
