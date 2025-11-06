import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-6 flex-1">
            <Link
              href="/"
              className="text-xl font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              NextBlogr
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
              >
                Feed
              </Link>
              {session && (
                <Link
                  href="/drafts"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/drafts')
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                >
                  My Drafts
                </Link>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
           

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-slate-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? 'M6 18L18 6M6 6l12 12' // X icon
                      : 'M4 6h16M4 12h16M4 18h16' // Hamburger
                  }
                />
              </svg>
            </button>

            {status === 'loading' && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Loading...
                </span>
              </div>
            )}
            {!session && status !== 'loading' && (
              <Link href="/api/auth/signin" className="btn-secondary">
                Sign in
              </Link>
            )}
            {session && (
              <>
                <Link href="/create" className="btn-primary">
                  New Post
                </Link>
                <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User avatar'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="text-sm">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {session.user.name}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => signOut()}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors px-3 py-2 cursor-pointer"
                >
                  Sign out
                </button>
              </>
            )}
             <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 space-y-1 px-2 pb-3 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/')
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              onClick={() => setMobileOpen(false)}
            >
              Feed
            </Link>
            {session && (
              <Link
                href="/drafts"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/drafts')
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                My Drafts
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
