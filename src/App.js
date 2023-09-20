import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  useEffect(() => {
    // Tente carregar os produtos do localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Se não houver produtos no localStorage, faça uma solicitação fetch
    if (storedProducts.length === 0) {
      fetch('http://localhost:3000/products')
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          // Salve os produtos no localStorage
          localStorage.setItem('products', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching products:', error));
    } else {
      // Se houver produtos no localStorage, defina-os no estado
      setProducts(storedProducts);
    }
  }, []);

  const handleAddProduct = () => {
    if (newProduct.name.trim() !== '') {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setNewProduct({ name: '', price: 0 });

      // Adicione o novo produto ao localStorage
      const productsInLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProductsInLocalStorage = [...productsInLocalStorage, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProductsInLocalStorage));
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    
    // Atualize o localStorage para refletir a remoção
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="centered-container">
      <div className="App">
        <h1>Product Management</h1>
        <ul className="product-list">
          {products.map((product, index) => (
            <li key={index} className="product-item">
              {product.name} - ${product.price.toFixed(2)}
              <button onClick={() => handleRemoveProduct(index)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          <input
            type="number"
            placeholder="Digite o preço"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleAddProduct} style={{ marginTop: '10px' }}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

export default App;





