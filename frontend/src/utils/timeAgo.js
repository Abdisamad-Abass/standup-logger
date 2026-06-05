export function timeAgo(dateString) {
  if (!dateString) return "";

  const past = new Date(dateString);

  // convert UTC → Nairobi (UTC + 3 hours)
  const nairobiOffsetMs = 3 * 60 * 60 * 1000;

  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - (past.getTime() + nairobiOffsetMs)) / 1000,
  );

  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
}
