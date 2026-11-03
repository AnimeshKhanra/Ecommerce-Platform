
export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Contact Us
      </h1>

      <p className="mb-8 text-gray-600">
        Have a question about your order or a product?
        We are here to help.
      </p>

      <div className="space-y-6 rounded-lg border p-6">
        <div>
          <h2 className="font-semibold">Email Support</h2>
          <p className="mt-1 text-gray-600">
            Send us an email for assistance with your order.
          </p>
          <a
            href="mailto:support@yourstore.com"
            className="text-blue-600 hover:underline"
          >
            support@yourstore.com
          </a>
        </div>

        <div>
          <h2 className="font-semibold">Order Assistance</h2>
          <p className="mt-1 text-gray-600">
            Please include your order number when contacting
            us about an existing order.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Response Time</h2>
          <p className="mt-1 text-gray-600">
            We aim to respond to customer inquiries as soon
            as possible during business days.
          </p>
        </div>
      </div>
    </main>
  );
}
