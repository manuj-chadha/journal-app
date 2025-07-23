import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvisibleReCAPTCHA from "./InvisibleRecaptcha";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on input
  };

  const handleCaptchaVerify = async (token) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        ...form,
        recaptchaToken: token,
      });

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Try again.");
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (recaptchaRef.current) {
        await recaptchaRef.current.executeCaptcha();
      } else {
        setError("Captcha not loaded.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Captcha error:", err);
      setError("Captcha verification failed.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

      <input
        id="username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border px-3 py-2 mb-3"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border px-3 py-2 mb-3"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border px-3 py-2 mb-3"
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <InvisibleReCAPTCHA
        ref={recaptchaRef}
        onVerify={handleCaptchaVerify}
      />
    </div>
  );
};

export default Signup;
