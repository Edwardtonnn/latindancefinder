export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <span className="inline-block text-xs font-semibold tracking-wide text-orange-700/80 bg-orange-100 rounded-full px-3 py-1">
          Groups only • Parks only • 6:00am–8:30pm
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
          Find salsa & bachata practice groups near you
        </h1>
        <p className="mt-3 md:text-lg text-gray-700 max-w-2xl mx-auto">
          Choose Salsa, Bachata or Blend. Meet at public parks. When 3 people join, the group goes live.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#discover"
            className="inline-flex items-center rounded-xl px-5 py-2.5 bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-sm"
          >
            Find groups
          </a>
          <a
            href="#create"
            className="inline-flex items-center rounded-xl px-5 py-2.5 border border-gray-300 hover:border-orange-600 hover:text-orange-600 transition-colors"
          >
            Start a group
          </a>
        </div>
      </div>
    </section>
  );
}
