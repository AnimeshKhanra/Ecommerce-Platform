const features = [
    {
        title: "Secure Payment",
        description: "Your payments are securely processed.",
    },
    {
        title: "Fast Delivery",
        description: "Get your orders delivered quickly.",
    },
    {
        title: "Quality Products",
        description: "We offer carefully selected products.",
    },
    {
        title: "Easy Shopping",
        description: "Simple and convenient shopping experience.",
    },
];


export default function WhyChooseUs() {
    return (
        <section className="border-t bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Our promise
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Shopping made simple
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Everything you need for a smooth and convenient
                        shopping experience.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <h3 className="mt-5 font-semibold text-gray-900">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}