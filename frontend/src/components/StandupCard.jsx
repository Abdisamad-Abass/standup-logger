import { formatNairobiTime } from "../utils/formatNairobiTime";
import { timeAgo } from "../utils/timeAgo";
import { FiDownload } from "react-icons/fi";
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
    <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
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
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            Blocker
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">
            Yesterday
          </p>
          <p>{post.yesterday}</p>
        </div>

        <div>
          <p className="font-medium text-gray-600 dark:text-gray-300">Today</p>
          <p>{post.today}</p>
        </div>

        {post.blockers && (
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Blockers
            </p>
            <p className="text-red-500">{post.blockers}</p>
          </div>
        )}
      </div>

      {/* File attachment */}
      {post.file && (
        <a
          href={`${import.meta.env.VITE_API_URL}/standups/download/${post.id}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-3 mt-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
        >
          {/* Left side */}
          <div className="flex items-center gap-2">
            <FiDownload className="text-blue-600 dark:text-blue-400 text-lg" />

            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Download Attachment
            </span>
          </div>

          {/* File badge */}
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
            {getFileType(post.file_name)}
          </span>
        </a>
      )}
    </div>
  );
}
