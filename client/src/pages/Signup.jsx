import React, { useState } from "react";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  FilmIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090f] text-white">
      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute -right-40 bottom-20 h-72 w-72 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="relative z-10 flex mt-20 min-h-screen items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl md:grid-cols-2">
          {/* Left Section */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/30 via-black to-pink-500/20 p-10 md:flex">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <FilmIcon className="h-8 w-8 text-primary" />
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Create Your <br />
                MovieTime Account
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-300">
                Sign up to book movie tickets, save your favourite movies, and
                manage your bookings easily.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <p className="text-sm text-gray-300">
                “Your next blockbuster experience starts with one simple
                signup.”
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="p-7 sm:p-10">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-bold">Sign Up</h2>
              <p className="mt-2 text-sm text-gray-400">
                Create an account to continue
              </p>
            </div>

            <form className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition focus-within:border-primary/60">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition focus-within:border-primary/60">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition focus-within:border-primary/60">
                  <LockIcon className="h-5 w-5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition focus-within:border-primary/60">
                  <LockIcon className="h-5 w-5 text-gray-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400 transition hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-400">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Button */}
            <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.07]">
              <span className="text-lg">G</span>
              Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;