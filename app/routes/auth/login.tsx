import type { ActionFunctionArgs } from 'react-router';
import { Form, Link, useActionData } from 'react-router';
import { useState } from 'react';
import { createLoginSession } from '../../utils/cookie-session/session.server';
import prisma from '../../utils/prisma.server';

import { BookOpen, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { verifyPassword } from '~/utils/password/password.server';


export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

    if (!email) {
      return ({ error: "Email is Required" });
    }
    if (!password) {
      return ({ error: "Passowrd is Required" });
    }

    const user = await prisma.user.findUnique({ where: { email: email as string } });

    // Check User and Credientails
    if (!user) {
      return { error: "Invalid credientails " }
    }

    const verifiedPassword = await verifyPassword(password as string, user.password as string);
    if (!verifiedPassword) {
      return { error: 'Invalid password' };
    }

    return await createLoginSession(user.id, "/dashboard");
}

export default function LoginPage() {
  const actionData = useActionData()

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d97757] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d97757] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Login Card */}
        <Form method="post" className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 space-y-5">
          {/* Logo & Header inside card */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#d97757] mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-xs ">
              Sign in to access your study resources
            </p>
          </div>

          {/* Error Message */}
          {actionData?.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
              <p className="text-red-600 text-sm font-medium">{actionData.error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-[#d97757]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                required
                autoComplete="email"
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 placeholder-gray-400/80 hover:border-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-[#d97757]">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 placeholder-gray-400/80 hover:border-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#d97757] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#d97757] focus:ring-[#d97757] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-[#d97757] hover:text-[#c66847] transition-colors underline-offset-2 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#d97757] text-white py-3.5 px-4 rounded-lg font-semibold hover:bg-[#c66847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d97757] transition-all transform hover:scale-[1.02] shadow-lg mt-4"
          >
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          {/* Sign Up Link */}
        <div className="text-center ">
          <p className="text-gray-400 text-sm ">
            Don't have an account?{' '}
            <Link to="/sign-up" className="font-semibold text-[#d97757] hover:text-[#c66847] transition-colors underline-offset-2 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
        </Form>

        
      </div>
    </div>
  );
}


