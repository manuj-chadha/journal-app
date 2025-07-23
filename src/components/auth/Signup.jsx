import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import InvisibleReCAPTCHA from "./InvisibleRecaptcha";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptchaVerify = async (token) => {
    const { username, email, password } = form;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/public/signup`,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-captcha-token": token,
          },
          withCredentials: true,
        }
      );

      const { token: authToken, user } = res.data.data;
      dispatch(setUser(user));
      localStorage.setItem("token", authToken);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (recaptchaRef.current) {
        // @ts-ignore
        await recaptchaRef.current.execute();
      } else {
        setError("Captcha not loaded.");
        setLoading(false);
      }
    } catch {
      setError("Captcha verification failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-8 pb-2">
      <div className="w-full max-w-md text-center space-y-6">
        <div>
          <h1 className="text-4xl md:text-6xl gradient-title mb-2 -mt-2">
            Get Started
          </h1>
          <p className="text-base text-orange-800">
            Start journaling your thoughts and track your emotional journey.
          </p>
        </div>

        <Card className="shadow-lg">
          <span className="block text-lg font-semibold text-orange-800">
            Sign Up
          </span>

          <CardContent className="-mt-4 space-y-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-left text-orange-800"
              >
                Full Name
              </label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your full name"
                className="bg-orange-50"
                value={form.username}
                onChange={handleChange}
              />

              <label
                htmlFor="email"
                className="text-sm font-medium text-left text-orange-800 mt-3"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-orange-50"
                value={form.email}
                onChange={handleChange}
              />

              <label
                htmlFor="password"
                className="text-sm font-medium text-left text-orange-800 mt-3"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="bg-orange-50"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              variant="journal"
              className="w-full py-6"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Signing Up...
                </>
              ) : (
                <>
                  Sign Up <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="text-sm text-orange-700">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-900 underline">
                Log in
              </Link>
            </div>
          </CardContent>

          <div className="flex items-center justify-center gap-4 -m-2">
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <InvisibleReCAPTCHA ref={recaptchaRef} onVerify={handleCaptchaVerify} />
      </div>
    </div>
  );
}
