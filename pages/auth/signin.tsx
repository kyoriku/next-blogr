import { getProviders, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export default function SignIn({ providers }: { providers: any }) {
  const router = useRouter();
  // Use callbackUrl from query, fallback to homepage
  const callbackUrl = (router.query.callbackUrl as string) || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
        {/* Logo / Branding */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          NextBlog
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Sign in to continue
        </p>

        {/* Providers */}
        <div className="space-y-4">
          {Object.values(providers).map((provider: any) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl })}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-950 transition-colors shadow-md cursor-pointer"
            >
              {/* GitHub icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.21 11.385c.6.11.82-.26.82-.577v-2.02c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.728.083-.728 1.204.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.933 0-1.31.467-2.381 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 016 0c2.292-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.12 3.176.77.839 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.922.43.372.814 1.103.814 2.222v3.293c0 .32.216.694.825.576A12.003 12.003 0 0024 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in with {provider.name}
            </button>
          ))}
        </div>

        {/* Optional footer */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
          By signing in, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

// Server-side fetch providers
export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? {} },
  };
};
