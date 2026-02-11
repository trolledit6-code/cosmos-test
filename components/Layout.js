import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title || 'Cosmos Explorer — Discover the Planets'}</title>
        <meta name="description" content={description || 'An interactive guide to the planets in our solar system.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex flex-col min-h-screen">
        {/* Background layers */}
        <div className="stars-layer" />
        <div className="nebula-glow" />

        {/* Content */}
        <Navbar />
        <main className="relative z-10 flex-grow pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
