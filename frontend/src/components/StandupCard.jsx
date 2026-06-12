import { formatNairobiTime } from "../utils/formatNairobiTime";
import { timeAgo } from "../utils/timeAgo";
import { FiDownload } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
export default function StandupCard({ post }) {
  const getFileType = (filename) => {
    if (!filename) return "";

    const ext = filename.split(".").pop().toLowerCase();

    const types = {
      pdf: "PDF",
      png: "PNG Image",
      jpg: "JPG Image",
      jpeg: "JPEG Image",
      gif: "GIF Image",
      doc: "Word Document",
      docx: "Word Document",
      xls: "Excel File",
      xlsx: "Excel File",
      txt: "Text File",
      xml: "XML File",
    };

    return types[ext] || ext.toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-[#0C0E12] border border-[#C3C6D7] dark:border-[#3F4759] rounded-xl p-4 shadow-sm space-y-3 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            {post.author}
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {formatNairobiTime(post.timestamp)}
            </span>

            <span className="text-gray-300 dark:text-gray-600">•</span>

            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {timeAgo(post.timestamp)}
            </span>
          </div>
        </div>

        {/* Blocker badge */}
        {post.has_blocker && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <IoWarningOutline className="text-base" />
            Blocker
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
        {/* Yesterday */}
        <div>
          <p className="font-medium text-[#2563EB] dark:text-gray-300">
            Yesterday
          </p>
          <p>{post.yesterday}</p>
        </div>

        <div>
          <p className="font-medium text-[#10B981] dark:text-gray-300">Today</p>
          <p>{post.today}</p>
        </div>

        {post.blockers && (
          <div className="bg-[#FBF3F3] dark:bg-[#1A0D11] p-3 rounded-lg border-l-4 border-[#BA1A1A] dark:border-[#FFB4AB]">
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Critical Blocker
            </p>
            <p className="text-red-500">{post.blockers}</p>
          </div>
        )}
      </div>

      {/* File attachment */}
      {/* File attachment */}
      {post.file && (
        <a
          href={`${import.meta.env.VITE_API_URL}/standups/download/${post.id}`}
          target="_blank"
          rel="noreferrer"
          className="
      mt-3
      flex items-center justify-between gap-3

      px-4 py-3
      rounded-xl

      bg-gradient-to-r 
      from-blue-50 to-indigo-50
      dark:from-blue-900/20 dark:to-indigo-900/20

      border border-blue-200
      dark:border-blue-800

      hover:shadow-md
      hover:border-blue-400

      transition-all duration-200
      group
    "
        >
          {/* Left section */}
          <div className="flex items-center gap-3">
            {/* Icon box */}
            <div
              className="
          w-10 h-10
          flex items-center justify-center

          rounded-lg

          bg-blue-600
          text-white

          shadow-sm

          group-hover:scale-105
          transition
        "
            >
              <FiDownload className="text-xl" />
            </div>

            <div>
              <p
                className="
          text-sm 
          font-semibold
          text-gray-800
          dark:text-gray-100
        "
              >
                Download Attachment
              </p>

              <p
                className="
          text-xs
          text-gray-500
          dark:text-gray-400
        "
              >
                Click to download file
              </p>
            </div>
          </div>

          {/* File Type Badge */}
          <span
            className="
        px-3 py-1

        rounded-full

        text-xs font-medium

        bg-white
        dark:bg-gray-900

        text-blue-600
        dark:text-blue-400

        border
        border-blue-200
        dark:border-blue-700
      "
          >
            {getFileType(post.file_name)}
          </span>
        </a>
      )}
    </div>
  );
}
