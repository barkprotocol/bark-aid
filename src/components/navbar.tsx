import Link from 'next/link';
import { marketingConfig } from '@/marketingConfig';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-black p-4">
      <ul className="flex space-x-4">
        {marketingConfig.mainNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a className="text-lg text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300">
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
