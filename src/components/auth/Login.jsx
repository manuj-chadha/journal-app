import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "@/lib/axios.js";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/public/login", { username, password }, 
        {headers: {
                    "Content-Type": "application/json"
                },
        withCredentials: true
    });
    console.log(res);
    
      localStorage.setItem("token", res.data.data.token);
      dispatch(setUser(res.data.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <div className="max-w-md mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl gradient-title mb-4">
          Welcome Back
        </h1>
        <p className="text-lg text-orange-800">
          Log in to access your journal and continue reflecting.
        </p>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col gap-4">
              <Input
                type="username"
                placeholder="username"
                className="bg-orange-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-orange-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              variant="journal"
              className="w-full py-6"
              onClick={handleLogin}
            >
              Log In <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-sm text-orange-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-orange-900 underline">
                Sign up
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
