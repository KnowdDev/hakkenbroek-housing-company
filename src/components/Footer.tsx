import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Hakkenbroek Housing Company</h3>
            <p className="text-gray-400 mb-4">
              Your reliable partner in real estate in Amsterdam and the Netherlands. 
              Over 20 years of experience serving expats and locals.
            </p>
            <p className="text-gray-400">
              <strong>Address:</strong> Leliegracht 21, Amsterdam
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Buying</li>
              <li className="text-gray-400">Selling</li>
              <li className="text-gray-400">Renting</li>
              <li className="text-gray-400">Leasing</li>
              <li className="text-gray-400">Property Management</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hakkenbroek Housing Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
