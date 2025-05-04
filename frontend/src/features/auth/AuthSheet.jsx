import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Check,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { useLoginMutation, useRegisterMutation } from "@/api/backendApi";
import { setCredentials } from "@/features/auth/authSlice";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthSheet({ isAuthOpen, setIsAuthOpen }) {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [signup] = useRegisterMutation();

  // Form mode state (login or signup)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState([]);
  const [loginTouchedFields, setLoginTouchedFields] = useState({
    email: false,
    password: false,
  });

  // Signup form state
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupErrors, setSignupErrors] = useState([]);
  const [signupTouchedFields, setSignupTouchedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Validation schemas
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const signupSchema = z
    .object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Helper function to safely check field validation
  const isFieldValid = (field, value) => {
    try {
      if (field === "email" && isLoginMode) {
        z.string().min(1).email().parse(value);
      } else if (field === "password" && isLoginMode) {
        z.string().min(6).parse(value);
      } else if (field === "username") {
        z.string().min(3).max(20).parse(value);
      } else if (field === "email" && !isLoginMode) {
        z.string().min(1).email().parse(value);
      } else if (field === "password" && !isLoginMode) {
        z.string().min(6).parse(value);
      } else if (field === "confirmPassword") {
        if (value !== signupPassword) {
          return false;
        }
        z.string().min(1).parse(value);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Validation functions
  const validateLoginForm = () => {
    try {
      loginSchema.parse({ email: loginEmail, password: loginPassword });
      setLoginErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setLoginErrors(error.errors.map((err) => err.message));
      }
      return false;
    }
  };

  const validateSignupForm = () => {
    try {
      signupSchema.parse({
        username,
        email: signupEmail,
        password: signupPassword,
        confirmPassword,
      });
      setSignupErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setSignupErrors(error.errors.map((err) => err.message));
      }
      return false;
    }
  };

  // Form submission handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginTouchedFields({ email: true, password: true });

    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      const res = await login({
        email: loginEmail,
        password: loginPassword,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Successfully logged in!");
      setIsAuthOpen(false);
      resetForms();
    } catch (err) {
      const msg =
        err?.data?.message || "Login failed. Please check your credentials.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupTouchedFields({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!validateSignupForm()) return;

    setIsLoading(true);
    try {
      const res = await signup({
        username,
        email: signupEmail,
        password: signupPassword,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Account created successfully!");
      setIsAuthOpen(false);
      resetForms();
    } catch (err) {
      const msg =
        err?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Field blur handlers
  const handleLoginFieldBlur = (field) => {
    setLoginTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateLoginForm();
  };

  const handleSignupFieldBlur = (field) => {
    setSignupTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateSignupForm();
  };

  // Reset form states
  const resetForms = () => {
    // Reset login form
    setLoginEmail("");
    setLoginPassword("");
    setLoginTouchedFields({ email: false, password: false });

    // Reset signup form
    setUsername("");
    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
    setSignupTouchedFields({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  // Toggle between login and signup modes
  const toggleAuthMode = () => {
    setIsLoginMode((prev) => !prev);
    setLoginErrors([]);
    setSignupErrors([]);
  };

  return (
    <Sheet open={isAuthOpen} onOpenChange={setIsAuthOpen}>
      <SheetContent className="sm:max-w-md p-0 border-l border-gray-800 bg-gray-900 text-white overflow-y-auto">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-5 border-b border-gray-800">
            <SheetTitle className="text-xl font-semibold text-white">
              {isLoginMode ? "Login" : "Create an Account"}
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              {isLoginMode
                ? "Enter your credentials to access your account"
                : "Sign up to start exploring the world"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 p-6">
            {isLoginMode ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {loginErrors.length > 0 && (
                  <div className="mb-2 p-3 bg-red-900/30 border border-red-500 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle
                        className="text-red-500 mr-2 mt-0.5"
                        size={16}
                      />
                      <div>
                        <ul className="text-red-200 text-sm list-disc pl-4 space-y-1">
                          {loginErrors.map((error, i) => (
                            <li key={i}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="login-email"
                    className="text-sm text-gray-300"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Mail size={16} />
                    </div>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      onBlur={() => handleLoginFieldBlur("email")}
                      className={`bg-gray-800 pl-10 text-white ${
                        loginTouchedFields.email &&
                        !isFieldValid("email", loginEmail)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-sm text-gray-300"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Lock size={16} />
                    </div>
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      onBlur={() => handleLoginFieldBlur("password")}
                      className={`bg-gray-800 pl-10 pr-10 text-white ${
                        loginTouchedFields.password &&
                        !isFieldValid("password", loginPassword)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                    >
                      {showLoginPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-sm text-blue-400">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="text-blue-400 font-medium"
                  >
                    Create one
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                {signupErrors.length > 0 && (
                  <div className="mb-2 p-3 bg-red-900/30 border border-red-500 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle
                        className="text-red-500 mr-2 mt-0.5"
                        size={16}
                      />
                      <div>
                        <ul className="text-red-200 text-sm list-disc pl-4 space-y-1">
                          {signupErrors.map((error, i) => (
                            <li key={i}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm text-gray-300">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <User size={16} />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => handleSignupFieldBlur("username")}
                      className={`bg-gray-800 pl-10 text-white ${
                        signupTouchedFields.username &&
                        !isFieldValid("username", username)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="johndoe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="signup-email"
                    className="text-sm text-gray-300"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Mail size={16} />
                    </div>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      onBlur={() => handleSignupFieldBlur("email")}
                      className={`bg-gray-800 pl-10 text-white ${
                        signupTouchedFields.email &&
                        !isFieldValid("email", signupEmail)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="signup-password"
                    className="text-sm text-gray-300"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Lock size={16} />
                    </div>
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      onBlur={() => handleSignupFieldBlur("password")}
                      className={`bg-gray-800 pl-10 pr-10 text-white ${
                        signupTouchedFields.password &&
                        !isFieldValid("password", signupPassword)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={() => setShowSignupPassword((prev) => !prev)}
                    >
                      {showSignupPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-sm text-gray-300"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      <Check size={16} />
                    </div>
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleSignupFieldBlur("confirmPassword")}
                      className={`bg-gray-800 pl-10 pr-10 text-white ${
                        signupTouchedFields.confirmPassword &&
                        !isFieldValid("confirmPassword", confirmPassword)
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="text-blue-400 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AuthSheet;
