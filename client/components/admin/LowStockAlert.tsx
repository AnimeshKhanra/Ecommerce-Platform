export default function LowStockAlert({ products }: { products: any[] }) {
  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-5">
      <h2 className="font-bold text-red-600 mb-4">Low Stock Alerts</h2>

      {products.length === 0 ? (
        <p>No low stock items.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
              {' - '}
              {product.stock} left
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
