import Link from 'next/link'
import { useUser } from '../lib/hooks'

const Header = () => {
  const user = useUser()

  return (
    <header className="p-2 flex justify-end">
      <nav className="sm:max-w-xs w-full bg-black rounded-lg">
        <ul className="p-3 flex flex-row justify-around">
          <li className="bg-gray-900 text-gray-400 hover:bg-gray-600 cursor-pointer p-3 rounded-md text-sm font-medium icon">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                className="w-8 h-8"
                >
                <path stroke-linecap="round" stroke-linejoin="round" 
                  stroke-width="1" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </li>
          {user ? (
            <>
              <li className="bg-gray-900 text-gray-400 hover:bg-gray-600 cursor-pointer p-3 rounded-md text-sm font-medium icon">
                <Link href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
</svg>
                </Link>
              </li>
              <li className="bg-gray-900 text-gray-400 hover:bg-gray-600 cursor-pointer p-3 rounded-md text-sm font-medium icon">
                <a href="/api/logout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
                </a>
              </li>
            </>
          ) : (
            <li className="bg-gray-900 text-gray-400 hover:bg-gray-600 cursor-pointer p-3 rounded-md text-sm font-medium icon">
              <Link href="/login">
              <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className="w-8 h-8"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`

      `}</style>
    </header>
  )
}

export default Header
