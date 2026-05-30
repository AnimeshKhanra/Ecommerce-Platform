// "use client";

// import { useEffect, useState } from "react";
// import { getLatestOrder } from "@/lib/paymentApi";
// import Link from "next/link";

// export default function SuccessPage() {
//   const [order, setOrder] =
//     useState<any>(null);

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   async function fetchOrder() {
//     try {
//       const data =
//         await getLatestOrder();
//       setOrder(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading order...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-12">
//       <div className="bg-white border rounded-2xl p-8 shadow-sm">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">
//           Payment Successful 🎉
//         </h1>

//         <p className="text-gray-600 mb-8">
//           Your order has been placed successfully.
//         </p>

//         <div className="space-y-4">
//           <p>
//             <strong>Order ID:</strong>{" "}
//             {order.id}
//           </p>

//           <p>
//             <strong>Name:</strong>{" "}
//             {order.shippingName}
//           </p>

//           <p>
//             <strong>Address:</strong>{" "}
//             {order.shippingAddress}
//           </p>

//           <p>
//             <strong>Total:</strong> ₹
//             {order.totalAmount}
//           </p>
//         </div>

//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">
//             Items
//           </h2>

//           <div className="space-y-3">
//             {order.items.map((item: any) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between border-b pb-2"
//               >
//                 <span>
//                   {item.product.name} ×{" "}
//                   {item.quantity}
//                 </span>

//                 <span>
//                   ₹
//                   {item.price *
//                     item.quantity}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <Link
//           href="/products"
//           className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-xl"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getLatestOrder } from "@/lib/paymentApi";
import Link from "next/link";

export default function SuccessPage() {
  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    pollOrder();
  }, []);

  async function pollOrder() {
    let attempts = 0;

    while (attempts < 10) {
      try {
        const data =
          await getLatestOrder();

        if (data) {
          setOrder(data);
          setLoading(false);
          return;
        }
      } catch {}

      attempts++;
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Confirming your payment...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Order confirmation delayed.</p>

        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="mb-8 text-gray-600">
          Your order has been confirmed.
        </p>

        <div className="space-y-4">
          <p>
            <strong>Order ID:</strong>{" "}
            {order.id}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
}