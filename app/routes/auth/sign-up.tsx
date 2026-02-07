import type { Route } from './+types/sign-up';
import { useState } from 'react';
import { Form, Link, useNavigation, useActionData, redirect } from 'react-router';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, BookOpen } from 'lucide-react';

import prisma from '../../utils/prisma.server';
import { hashPassword } from '../../utils/password/password.server';
import { createLoginSession, getUserId } from '~/utils/cookie-session/session.server';

// Check if user is already logged in ?
export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) {
    return redirect('/user/dashboard')
  }
  return null
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const user_name = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')

  if (!user_name) {
    return { error: 'Username is required' };
  }
  if (!email) {
    return { error: 'Email is required' };
  }
  if (!password) {
    return { error: 'Password is required' };
  }

  try {

    // Hash the password
    const hashedPassword = await hashPassword(password as string);

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({ where: { email: email as string } });
    if (existingEmail) {
      return { error: 'Email already exists' };
    }
    // Create user in database
    const user = await prisma.user.create({
      data: { user_name: user_name as string, email: email as string, password: hashedPassword as string },
    });

    if (!user) {
      return { error: 'Failed to create user' };
    }
    // Create session for user 
    return await createLoginSession(user.id, "/user/dashboard");
  } catch (error) {
    return { error: 'Failed to create user' };
  }
}
export default function SignUpPage() {
  const actionData = useActionData<typeof action>();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full relative z-10">
        <Form
          method="post"
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 sm:p-10 space-y-5">
          {/* Logo & Header inside card */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#d97757] mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-xs tracking-wide">
              Join our community and start sharing your study resources
            </p>
          </div>

          {/* Error Message */}
          {actionData?.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-2">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{actionData.error}</p>
            </div>
          )}

          {/* Username Input */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="block text-sm font-semibold text-[#d97757]">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                required
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>

          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-[#d97757]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                required
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400/80 dark:placeholder-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
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
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                required
                minLength={6}
                className="block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400/80 dark:placeholder-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 dark:text-gray-500 hover:text-[#d97757] transition-colors"
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

          {/* Terms & Conditions */}
          <div className="flex items-start pt-2">
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#d97757] focus:ring-[#d97757] border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded cursor-pointer"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300 cursor-pointer leading-relaxed">
                I agree to the{' '}
                <Link to="/terms-of-service" className="font-semibold text-[#d97757] hover:text-[#c66647] transition-colors underline-offset-2 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="font-semibold text-[#d97757] hover:text-[#c66847] transition-colors underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-[#d97757] text-white py-3.5 px-4 rounded-lg font-semibold hover:bg-[#c66847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d97757] transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-[#d97757] mt-4"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
          {/* Sign In Link */}
          <div className="text-center ">
            <p className="text-gray-400 dark:text-gray-400 text-sm ">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#d97757] hover:text-[#c66847] transition-colors underline-offset-2 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Form>


      </div>
    </div>
  );
}