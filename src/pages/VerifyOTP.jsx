import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillSendFill } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import { resendEmailOTP, verifyEmail } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { formErrorHandler } from "../utils/formErrorHandler";

const resendTimerCountdown = 90;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(resendTimerCountdown);

  const handleResendOTP = asyncHandler(
    async () => {
      if (resendTimer > 0) return;
      setIsResending(true);
      setOtp("");

      await resendEmailOTP({ email });
      toast.success("OTP resent successfully");

      setResendTimer(resendTimerCountdown);
    },
    {
      onError: formErrorHandler(setError),
      onFinally: () => setIsResending(false),
    },
  );

  const handleVerifyEmail = asyncHandler(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError({});

      const payload = {
        email: email.trim(),
        otp: otp.trim(),
      };

      await verifyEmail(payload);
      toast.success("Verification successful");
      navigate("/login");
    },
    {
      onError: formErrorHandler(setError),
      onFinally: () => {
        setIsLoading(false);
        setOtp("");
      },
    },
  );

  useEffect(() => {
    if (!email) {
      navigate("/signup");
      return;
    }
  }, [email]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-md bg-white shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white"
            >
              OTP Verification
            </motion.h1>
          </div>
          {email && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4"
            >
              <p className="rounded-sm bg-green-100 p-2 text-center text-green-700">
                We have sent a verification code to your email: {email}
              </p>
            </motion.div>
          )}
          {/* Form */}
          <form onSubmit={handleVerifyEmail} className="space-y-4 p-6 pt-0">
            {/* OTP Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative mb-5"
            >
              <label
                htmlFor="otp"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  id="otp"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-sm border border-gray-300 px-3 py-2 tracking-wider text-black shadow-sm transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter Verification Code"
                />
              </div>
              <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                {error.otp}
              </p>
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 space-y-2"
            >
              <button
                type="submit"
                disabled={isLoading || otp.trim().length < 6}
                className={`flex w-full items-center justify-center rounded-sm border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                  isLoading
                    ? "cursor-not-allowed bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } transition focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${isLoading || otp.trim().length < 6 ? "cursor-not-allowed opacity-50" : ""} `}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Submit
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || resendTimer !== 0}
                className={`flex w-full items-center justify-center rounded-sm border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                  isResending
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gray-600 hover:bg-gray-700"
                } transition focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none ${resendTimer !== 0 ? "cursor-not-allowed opacity-50" : ""} `}
              >
                {isResending ? (
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resending...
                  </>
                ) : resendTimer === 0 ? (
                  <>
                    <BsFillSendFill className="mr-2" />
                    Resend OTP
                  </>
                ) : (
                  `Resend OTP in ${resendTimer}s`
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
