import { useEffect, useState } from "react";
import { getMemberCount } from "../api/authApi";

export default function useMemberCount() {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await getMemberCount();
      setCount(res.data.total_members);
    } catch (err) {
      setCount(0);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return { count, refetch: fetchCount };
}
