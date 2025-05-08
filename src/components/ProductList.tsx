'use client';
import { useProducts } from '@/hook/useProducts';

export default function ProductList() {
  const { data: products, isLoading, isError } = useProducts()

  if (isLoading) return <p>Loading products…</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product?.id}>
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
