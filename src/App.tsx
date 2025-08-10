import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { DiscoverSection, CreateSection, HowItWorks, ContactSection } from "./components/Sections";
// import ZipSearch from "./components/ZipSearch";

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <DiscoverSection>
        {/* <ZipSearch /> */}
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
          ZIP search coming soon.
        </div>
      </DiscoverSection>
      <CreateSection />
      <HowItWorks />
      <ContactSection />
      <Footer />
    </main>
  );
}
