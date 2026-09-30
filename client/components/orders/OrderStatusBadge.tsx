import { OrderStatus } from '@/types/order.types';

interface Props {
  status: OrderStatus;
}

const styles: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-indigo-100 text-indigo-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrderStatusBadge({ status }: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// interface Props {
//   status: string;
// }

// export default function OrderStatusBadge({ status }: Props) {
//   const styles = {
//     PENDING: "bg-yellow-100 text-yellow-700",
//     SHIPPED: "bg-blue-100 text-blue-700",
//     DELIVERED: "bg-green-100 text-green-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-sm font-medium ${
//         styles[status as keyof typeof styles]
//       }`}
//     >
//       {status}
//     </span>
//   );
// }
