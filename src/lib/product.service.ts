import axios from 'axios';


export async function getProducts() {
  const response = await axios.get('http://localhost:3000/api/products');
  return response.data.products;
}