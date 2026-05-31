import { OrderItem as Item } from "@/types/order";

interface Props {
  item: Item;
}

export default function OrderItem({ item }: Props) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <img
        src={item.image}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded"
      />

      <div>
        <h4 className="font-semibold">
          {item.productName}
        </h4>

        <p>Qty: {item.quantity}</p>

        <p>₹{item.price}</p>
      </div>
    </div>
  );
}