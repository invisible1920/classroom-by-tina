export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Classroom by Tina
        </h1>

        <div className="hidden gap-8 md:flex">
          <a href="#features" className="text-slate-600 hover:text-slate-900">
            Features
          </a>
          <a href="#pricing" className="text-slate-600 hover:text-slate-900">
            Pricing
          </a>
          <a href="#about" className="text-slate-600 hover:text-slate-900">
            About
          </a>
        </div>

        <a
          href="#pricing"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Join
        </a>
      </nav>
    </header>
  );
}