// "use client";

// import { useEffect, useState } from "react";
// import { getLatestOrder } from "@/lib/paymentApi";
// import { useCartStore } from "@/store/cartStore";
// import Link from "next/link";

// export default function SuccessPage() {
//   const [order, setOrder] = useState<any>(null);
//   const fetchCart = useCartStore((state) => state.fetchCart);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   useEffect(() => {
//     pollOrder();
//   }, []);

//   async function pollOrder() {
//     let attempts = 0;

//     while (attempts < 10) {
//       try {
//         const data =
//           await getLatestOrder();

//         if (data) {
//           setOrder(data);
//           setLoading(false);
//           return;
//         }
//       } catch {}

//       attempts++;
//       await new Promise((resolve) =>
//         setTimeout(resolve, 2000)
//       );
//     }

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Confirming your payment...
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p>Order confirmation delayed.</p>

//         <Link
//           href="/products"
//           className="bg-black text-white px-6 py-3 rounded-xl"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-12">
//       <div className="bg-white border rounded-2xl p-8 shadow-sm">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">
//           Payment Successful 🎉
//         </h1>

//         <p className="mb-8 text-gray-600">
//           Your order has been confirmed.
//         </p>

//         <div className="space-y-4">
//           <p>
//             <strong>Order ID:</strong>{" "}
//             {order.id}
//           </p>

//           <p>
//             <strong>Total:</strong> ₹
//             {order.totalAmount}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { getLatestOrder } from "@/lib/paymentApi";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

interface Order {
  id: string;
  totalAmount: number | string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const confirmOrder = async () => {
      let attempts = 0;

      while (attempts < 10) {
        try {
          const data = await getLatestOrder();

          if (data) {
            // Webhook has created the order,
            // so the cart should already be cleared in DB.
            setOrder(data);

            // Refresh Zustand cart state
            await fetchCart();

            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Waiting for order confirmation:", error);
        }

        attempts++;

        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
      }

      setLoading(false);
    };

    confirmOrder();
  }, [fetchCart]);

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