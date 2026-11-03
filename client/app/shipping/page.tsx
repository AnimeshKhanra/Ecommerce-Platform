
export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Shipping Information
      </h1>

      <p className="mb-8 text-gray-600">
        Learn how we process and deliver your orders.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Order Processing
          </h2>
          <p className="leading-7 text-gray-600">
            After your order is placed, we prepare it for
            shipment. Processing times may vary depending
            on product availability and order volume.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Delivery Time
          </h2>
          <p className="leading-7 text-gray-600">
            Delivery estimates depend on your location,
            shipping method, and courier service. Your
            tracking information can help you follow
            your shipment.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Shipping Charges
          </h2>
          <p className="leading-7 text-gray-600">
            Applicable shipping charges are displayed
            during checkout before you complete your order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Need Help?
          </h2>
          <p className="leading-7 text-gray-600">
            If your order is delayed or you have questions
            about delivery, please contact our support team.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Contact Support →
          </a>
        </section>
      </div>
    </main>
  );
}
