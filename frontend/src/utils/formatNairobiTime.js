export function formatNairobiTime(timestamp) {
  if (!timestamp) return "";

  const utcDate = new Date(timestamp + "Z");

  return (
    utcDate.toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " EAT"
  );
}
