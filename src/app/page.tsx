import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: 'Stream Anywhere',
    description: 'Watch movies on any device, anywhere, anytime.',
    imageUrl: '/stream_anywhere.avif',
  },
  {
    title: 'Exclusive Content',
    description: 'Access exclusive movies and shows only available on our platform.',
    imageUrl: '/exclusive_content.avif',
  },
  {
    title: 'Offline Viewing',
    description: 'Download movies and watch them offline at your convenience.',
    imageUrl: '/offline_viewing.webp',
  },
  // Add more features if needed
];

export default function Home() {
  return (
    <div className="container mx-auto my-32 p-4">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-center bg-cover " style={{ backgroundImage: "url('/hero.avif')", opacity: 0.8 }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to MovieStream</h1>
          <p className="text-xl mb-8">Your favorite movies, anytime, anywhere.</p>
          <Link href={"/all-movies"}>
          <button className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Start exploring..</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features mt-12">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 p-4">
              <Image src={feature.imageUrl} alt={feature.title} width={600} height={400} className="rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
