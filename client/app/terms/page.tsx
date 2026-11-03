
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Terms & Conditions
      </h1>

      <p className="mb-8 text-sm text-gray-500">
        Last updated: October 29, 2026
      </p>

      <p className="mb-8 leading-7 text-gray-600">
        Welcome to our online store. By accessing or
        using this website, you agree to these Terms &
        Conditions. Please read them carefully before
        using our services or placing an order.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Use of Our Website
          </h2>
          <p className="leading-7 text-gray-600">
            You agree to use this website only for lawful
            purposes. You must not misuse our services,
            interfere with website operations, attempt
            unauthorized access, or submit false
            information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. Accounts
          </h2>
          <p className="leading-7 text-gray-600">
            You are responsible for maintaining the
            confidentiality of your account credentials
            and for activity performed through your
            account. Please notify us if you suspect
            unauthorized access. We may restrict or
            suspend accounts when reasonably necessary
            for security, fraud prevention, or legal
            compliance.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Products and Pricing
          </h2>
          <p className="leading-7 text-gray-600">
            We aim to display accurate product descriptions,
            images, prices, and availability. Errors may
            occasionally occur. Applicable prices, taxes,
            shipping charges, and other costs will be
            presented during checkout where required.
            We will handle pricing or listing errors in
            accordance with applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Orders and Payments
          </h2>
          <p className="leading-7 text-gray-600">
            Placing an order constitutes an offer to
            purchase the selected products. Order
            acceptance and confirmation are subject to
            the checkout process and applicable law.
            Payments may be processed through third-party
            payment providers. Orders may be declined
            or cancelled for valid reasons, subject to
            applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Shipping and Delivery
          </h2>
          <p className="leading-7 text-gray-600">
            Delivery estimates are provided for guidance
            and may vary based on location, courier
            availability, and other circumstances.
            Please review our shipping information for
            additional details.
          </p>
          <a
            href="/shipping"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Shipping Information →
          </a>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Returns and Refunds
          </h2>
          <p className="leading-7 text-gray-600">
            Returns, replacements, and refunds are handled
            according to our applicable return policy and
            consumer protection laws. Nothing in these
            terms removes any rights that cannot legally
            be excluded.
          </p>
          <a
            href="/returns"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Returns Policy →
          </a>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            7. Intellectual Property
          </h2>
          <p className="leading-7 text-gray-600">
            Website content, including text, graphics,
            logos, and design elements, may be protected
            by intellectual property laws. You may not
            reproduce or commercially use protected
            content without authorization, except as
            permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            8. Limitation of Liability
          </h2>
          <p className="leading-7 text-gray-600">
            To the extent permitted by applicable law,
            we are not responsible for losses arising
            from misuse of the website or circumstances
            beyond our reasonable control. These terms
            do not exclude liability that cannot legally
            be excluded or restricted.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            9. Changes to These Terms
          </h2>
          <p className="leading-7 text-gray-600">
            We may update these terms from time to time.
            Updated terms will be published on this page
            with a revised date. Changes will take effect
            as required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            10. Contact Us
          </h2>
          <p className="leading-7 text-gray-600">
            If you have questions about these terms,
            please contact our support team at{" "}
            <a
              href="mailto:support@yourstore.com"
              className="text-blue-600 hover:underline"
            >
              support@yourstore.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
