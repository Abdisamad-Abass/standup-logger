import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { createStandup } from "../api/standupApi";

export default function StandupForm({ onSuccess }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    author: "",
    yesterday: "",
    today: "",
    blockers: "",
    has_blocker: false,
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  // VALIDATION FOR ALL FIELDS
  const validate = () => {
    if (!form.author.trim()) {
      toast.error("Author is required");
      return false;
    }

    if (!form.yesterday.trim()) {
      toast.error("Yesterday field is required");
      return false;
    }

    if (!form.today.trim()) {
      toast.error("Today field is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const data = new FormData();

      data.append("author", form.author);
      data.append("yesterday", form.yesterday);
      data.append("today", form.today);
      data.append("blockers", form.blockers);
      data.append("has_blocker", form.has_blocker);

      if (form.file) data.append("file", form.file);

      await createStandup(data);

      toast.success("Standup submitted successfully");

      // reset form
      setForm({
        author: "",
        yesterday: "",
        today: "",
        blockers: "",
        has_blocker: false,
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Failed to submit standup");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border rounded-lg px-3 py-2 text-sm outline-none transition " +
    "bg-white dark:bg-gray-800 " +
    "border-gray-200 dark:border-gray-700 " +
    "text-gray-900 dark:text-white " +
    "placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-5 border border-gray-100 dark:border-gray-800 transition-colors">
      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        Daily Standup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author */}
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Your name"
          className={inputStyle}
        />
        {/* Yesterday */}
        <textarea
          name="yesterday"
          value={form.yesterday}
          onChange={handleChange}
          placeholder="What did you do yesterday?"
          className={`${inputStyle} resize-none h-20`}
        />

        {/* Today */}
        <textarea
          name="today"
          value={form.today}
          onChange={handleChange}
          placeholder="What are you doing today?"
          className={`${inputStyle} resize-none h-20`}
        />

        {/* Blockers */}
        <textarea
          name="blockers"
          value={form.blockers}
          onChange={handleChange}
          placeholder="Any blockers?"
          className={`${inputStyle} resize-none h-20`}
        />

        {/* Checkbox */}
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="has_blocker"
            checked={form.has_blocker}
            onChange={handleChange}
            className="accent-blue-600"
          />
          Mark as blocker
        </label>

        {/* File Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFile}
          className={`${inputStyle} file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-blue-600 file:text-white file:rounded-md`}
        />

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Standup"}
        </button>
      </form>
    </div>
  );
}
