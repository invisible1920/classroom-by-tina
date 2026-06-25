export default function Pricing() {
  const benefits = [
    "K–2 classroom resources",
    "Lesson plans and activities",
    "Centers and assessments",
    "New content added regularly",
  ];

  return (
    <section id="pricing" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-widest text-blue-400">
          Founding Teacher Access
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Join early and help shape the platform.
        </h2>

        <p className="mt-6 text-lg text-slate-300">
          Get early access to Classroom by Tina as we build the first complete
          lower-grade resource library.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-8 text-slate-900">
          <div className="text-5xl font-extrabold">$9</div>
          <p className="mt-2 text-slate-600">
            per month during founding launch
          </p>

          <ul className="mt-8 space-y-3 text-left">
            {benefits.map((benefit) => (
              <li key={benefit}>✓ {benefit}</li>
            ))}
          </ul>

          <button className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700">
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}