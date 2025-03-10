import React, { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/products";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: "",
    discountPercentage: "",
    rating: "",
    stock: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result.products.slice(0, 20));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { title, price, category, thumbnail, discountPercentage, rating, stock } = productForm;
    if (!title || !price || !category || !thumbnail || !discountPercentage || !rating || !stock) {
      alert("All fields are required!");
      return false;
    }
    return true;
  };

  const addProduct = () => {
    if (!validateForm()) return;

    const newProduct = {
      id: currentProductId || Date.now(),
      title: productForm.title,
      price: Number(productForm.price),
      category: productForm.category,
      thumbnail: productForm.thumbnail,
      discountPercentage: Number(productForm.discountPercentage),
      rating: Number(productForm.rating),
      stock: Number(productForm.stock),
    };

    if (editMode) {

      setData((prevData) =>
        prevData.map((product) =>
          product.id === currentProductId ? { ...product, ...newProduct } : product
        )
      );
    } else {

      setData((prevData) => [newProduct, ...prevData]);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setProductForm({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage.toString(),
      rating: product.rating.toString(),
      stock: product.stock.toString(),
    });
    setCurrentProductId(product.id);
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setProductForm({
      title: "",
      price: "",
      category: "",
      thumbnail: "",
      discountPercentage: "",
      rating: "",
      stock: "",
    });
    setEditMode(false);
    setShowModal(false);
    setCurrentProductId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Product List</h1>

      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add Product
      </button>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product.id} className="p-6 bg-white text-black rounded-xl shadow-xl">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mt-4 rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
              <p className="text-lg text-gray-700">Price: ${product.price}</p>
              <p className="text-md text-gray-600">
                Discount Price: <span className="font-bold">${product.discountPercentage}</span>
              </p>
              <p className="text-md text-gray-600">
                Rating: <span className="font-bold">{product.rating}⭐</span>
              </p>
              <p className="text-md text-gray-600">In Stock: {product.stock} left</p>
              <p className="text-md text-gray-600">Category: {product.category}</p>
              <button
                onClick={() => handleEdit(product)}
                className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Product" : "Add New Product"}</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={productForm.title}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productForm.price}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={productForm.category}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              value={productForm.thumbnail}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount %"
              value={productForm.discountPercentage}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={productForm.rating}
              onChange={handleFormChange}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={productForm.stock}
              onChange={handleFormChange}
              className="w-full p-2 mb-4 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={addProduct} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

