import { useState } from "react";
import { createUser } from "../api/authApi";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";

export default function CreateUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await createUser({
        admin_email: "admin@standup.com",
        admin_password: "Admin12345",

        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });

      toast.success("Member Created");

      // RESET FORM AFTER SUCCESS
      setForm({
        full_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const message = error?.response?.data?.error || "Failed to create member";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-2 md:px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800 md:p-8 p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create Member
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Add a new team member to the standup system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  value={form.full_name}
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      full_name: e.target.value,
                    })
                  }
                />
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
                  value={form.email}
                  placeholder="Enter email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
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
                  value={form.password}
                  placeholder="Create password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold shadow-md transition-all duration-200 text-white
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-[#2563EB] hover:bg-blue-700 hover:shadow-lg"}
                   `}
            >
              {loading ? "Creating Member..." : "Create Member"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
