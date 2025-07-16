import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "@/lib/axios";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { username, email, password } = form;
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/public/signup`, { username, email, password }, {headers: {
                    "Content-Type": "application/json"
                },
        withCredentials: true
    });

      const { token, user } = res.data.data;

      dispatch(setUser(user));
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <div className="max-w-md mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl gradient-title mb-4">
          Create Your Account
        </h1>
        <p className="text-lg text-orange-800">
          Start journaling your thoughts and track your emotional journey.
        </p>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col gap-4">
              <Input
                name="username"
                placeholder="Full Name"
                className="bg-orange-50"
                value={form.username}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-orange-50"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-orange-50"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button variant="journal" className="w-full py-6" onClick={handleSubmit}>
              Sign Up <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-sm text-orange-700">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-900 underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-orange-600" />
          </div>
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
