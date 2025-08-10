export function DiscoverSection({ children }: { children?: React.ReactNode }) {
  return (
    <section id="discover" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight">Find a group near you</h2>
      <p className="text-gray-700 mt-1">Enter your ZIP to see nearby groups and parks.</p>
      <div className="mt-6">{children || (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">ZIP search coming soon.</p>
        </div>
      )}</div>
    </section>
  );
}

export function CreateSection() {
  return (
    <section id="create" className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">Start a group</h2>
        <p className="text-gray-700 mt-1">
          Choose style, pick a park, and set a weekly time between 6:00am and 8:30pm.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a className="rounded-xl border p-4 hover:border-orange-600 transition-colors" href="#">
            Salsa
          </a>
          <a className="rounded-xl border p-4 hover:border-orange-600 transition-colors" href="#">
            Bachata
          </a>
          <a className="rounded-xl border p-4 hover:border-orange-600 transition-colors" href="#">
            Blend
          </a>
          <a className="rounded-xl border p-4 hover:border-orange-600 transition-colors" href="#">
            Pick a park
          </a>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const items = [
    { title: "Pick your style", text: "Salsa, Bachata or Blend." },
    { title: "Choose a park", text: "We only list public parks for safety." },
    { title: "Pick a time", text: "One weekday between 6:00am and 8:30pm." },
    { title: "Get 3 people", text: "When 3 join, we email everyone—it's on!" },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="font-semibold">{it.title}</div>
            <p className="text-sm text-gray-600 mt-1">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="text-gray-700 mt-1">Have a park suggestion or feedback?</p>
        <div className="mt-4">
          <a className="inline-block underline decoration-2 underline-offset-4 hover:text-orange-600" href="mailto:hello@latindancefinder.com">
            hello@latindancefinder.com
          </a>
        </div>
      </div>
    </section>
  );
}
