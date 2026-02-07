import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 sm:p-10 space-y-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

