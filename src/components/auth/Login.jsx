import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import InvisibleReCAPTCHA from "./InvisibleRecaptcha";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCaptchaVerify = async (token) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/public/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-captcha-token": token, // customize header key if needed
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", res.data.data.token);
      dispatch(setUser(res.data.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      if (recaptchaRef.current) {
        // @ts-ignore – Ignore type warning for execute()
        await recaptchaRef.current.execute();
      } else {
        toast.error("Captcha not loaded.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Captcha execution failed.");
      setLoading(false);
    }
  };

  return (
    <div className="container max-h-screen mx-auto px-4 pt-16 pb-16">
      <div className="max-w-md mx-auto text-center space-y-8 pb-5">
        <h1 className="text-4xl md:text-6xl gradient-title mb-4">
          Welcome Back
        </h1>
        <p className="text-lg text-orange-800">
          Log in to access your journal and continue reflecting.
        </p>

        <Card className="shadow-lg">
          <span className="block text-lg font-semibold text-orange-800">
            Login
          </span>
          <CardContent className="-mt-2 space-y-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-left text-orange-800"
              >
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                className="bg-orange-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label
                htmlFor="password"
                className="text-sm font-medium text-left text-orange-800 mt-3"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="bg-orange-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="journal"
              className="w-full py-6"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Logging In...
                </>
              ) : (
                <>
                  Log In <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="text-sm text-orange-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-orange-900 underline">
                Sign up
              </Link>
            </div>
          </CardContent>

          <div className="flex items-center justify-center gap-4">
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <InvisibleReCAPTCHA ref={recaptchaRef} onVerify={handleCaptchaVerify} />
      </div>
    </div>
  );
}
