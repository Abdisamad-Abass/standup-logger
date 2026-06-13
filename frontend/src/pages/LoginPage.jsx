import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUsers } from "react-icons/fi";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({
        email: form.email,
        password: form.password,
        role: form.role,
      });

      login(res.data.user);
      toast.success(`Welcome ${res.data.user.name}`);

      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Card */}
      <div className="w-full max-w-md">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Standup Logger
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Welcome back — login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Login As
              </label>

              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <select
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white font-semibold
                transition-all duration-300
                shadow-lg hover:shadow-xl
                active:scale-[0.98]
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center relative z-10">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Make sure you select the correct role before logging in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
