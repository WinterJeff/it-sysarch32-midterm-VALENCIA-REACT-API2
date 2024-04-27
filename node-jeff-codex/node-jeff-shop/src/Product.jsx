import React, { useState, useEffect } from 'react';

const Product = ({ history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('productImage', productImage);

      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      console.log('Product added successfully');
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token'); // Remove token from localStorage
      // Redirect to login page after sign-out
      history.push('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      <div>
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <img src={`http://localhost:3000/${product.productImage}`} alt={product.name} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Product;
