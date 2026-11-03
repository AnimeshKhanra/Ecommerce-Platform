
export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Privacy Policy
      </h1>

      <p className="mb-8 text-sm text-gray-500">
        Last updated: October 29, 2026
      </p>

      <p className="mb-8 leading-7 text-gray-600">
        Your privacy matters to us. This Privacy Policy
        explains how our store collects, uses, stores,
        and protects your personal information when you
        visit our website or make a purchase.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p className="leading-7 text-gray-600">
            We may collect information such as your name,
            email address, phone number, shipping address,
            order details, and account information when
            you register, place an order, or contact us.
            Basic technical information may also be
            collected when you use our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>To process and deliver your orders.</li>
            <li>To manage your account and shopping cart.</li>
            <li>To provide customer support.</li>
            <li>To process payments and refunds.</li>
            <li>To improve website security and performance.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Payments
          </h2>
          <p className="leading-7 text-gray-600">
            Payments may be processed by third-party
            payment providers. Payment information is
            handled according to the provider's applicable
            privacy and security practices. We do not
            intentionally store complete payment card
            details on our own servers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Sharing of Information
          </h2>
          <p className="leading-7 text-gray-600">
            We may share necessary information with
            delivery partners, payment providers, hosting
            services, and other service providers to
            operate our store. We may also disclose
            information when required by applicable law.
            We do not sell personal information as a
            business practice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Data Security and Retention
          </h2>
          <p className="leading-7 text-gray-600">
            We use reasonable technical and organizational
            measures to protect personal information.
            However, no online system can guarantee
            absolute security. We retain information for
            as long as necessary for legitimate business,
            security, and legal purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Cookies and Similar Technologies
          </h2>
          <p className="leading-7 text-gray-600">
            Our website may use cookies or similar
            technologies to maintain sessions, support
            shopping cart functionality, improve security,
            and understand website usage. You can manage
            cookies through your browser settings, though
            some features may not work properly if they
            are disabled.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            7. Your Privacy Rights
          </h2>
          <p className="leading-7 text-gray-600">
            Depending on applicable law, you may have
            rights to request access to, correction of,
            or deletion of your personal information.
            You may also have other rights under applicable
            data protection laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            8. Contact Us
          </h2>
          <p className="leading-7 text-gray-600">
            If you have questions about this Privacy Policy
            or how we handle your information, contact us
            at{" "}
            <a
              href="mailto:privacy@yourstore.com"
              className="text-blue-600 hover:underline"
            >
              privacy@yourstore.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
