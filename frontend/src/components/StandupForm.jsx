import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { createStandup } from "../api/standupApi";
import { FaRegEdit } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

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
    "bg-[#F8F9FF] dark:bg-[#111418] " +
    "border-[#E5E7F0] dark:border-[#222731] " +
    "text-gray-900 dark:text-white " +
    "placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="bg-white dark:bg-[#0C0E12] p-6 rounded-xl shadow-md space-y-5 border border-[#C3C6D7] dark:border-[#3F4759] transition-colors">
      {/* Title */}
      <h2 className="text-lg font-bold text-[#2563EB] dark:text-white flex items-center gap-2">
        <FaRegEdit className="text-xl" /> Daily Standup
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
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div
            className="
              w-full flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl
              border-2 border-dashed border-[#cfd6e6] dark:border-[#2a2f3a]
              bg-[#F8F9FF] dark:bg-[#111418] text-gray-600 dark:text-gray-300
              hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800
              hover:shadow-md
              transition-all duration-200 ease-in-out
              cursor-pointer
            "
          >
            <MdUploadFile className="text-3xl text-blue-500" />

            <p className="text-sm font-medium">
              {form.file ? form.file.name : "Drag & drop your file here"}
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              or click to browse (PDF, image, docs)
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-[#004AC6]  hover:bg-blue-600 shadow-md hover:shadow-xl transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting...
            </>
          ) : (
            <>
              <IoSendSharp className="text-xl" />
              Submit Standup
            </>
          )}
        </button>
      </form>
    </div>
  );
}
