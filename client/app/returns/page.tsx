
export default function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Returns & Refunds
      </h1>

      <p className="mb-8 text-gray-600">
        We want you to have a positive shopping experience.
        Read our return guidelines below.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Return Eligibility
          </h2>
          <p className="leading-7 text-gray-600">
            Return eligibility depends on the product,
            its condition, and the applicable return policy.
            Please contact our support team to confirm
            whether your item qualifies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            How to Request a Return
          </h2>
          <ol className="list-decimal space-y-2 pl-6 text-gray-600">
            <li>Contact our support team.</li>
            <li>Provide your order number and reason for return.</li>
            <li>Follow the instructions provided by our team.</li>
            <li>Keep the item and packaging ready if required.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Refunds
          </h2>
          <p className="leading-7 text-gray-600">
            Refund eligibility and processing times depend
            on the return outcome and payment method.
            Approved refunds are processed according to
            the applicable refund policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Questions About a Return?
          </h2>
          <p className="leading-7 text-gray-600">
            Our support team can help you understand the
            return process and available options.
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
