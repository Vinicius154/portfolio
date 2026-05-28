import { setRequestLocale } from "next-intl/server";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Aurora from "./components/Aurora";
import CursorSpotlight from "./components/CursorSpotlight";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen">
      <Aurora />
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
