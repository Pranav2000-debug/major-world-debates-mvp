import { useEffect, useState } from "react";
import axios from "axios";
import { handleApiError } from "@/utils/handleApiError";

export function useMyPdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/pdfs", {
          withCredentials: true,
        });
        // spoof loader
        await new Promise((r) => setTimeout(r, 1000));
        setPdfs(res?.data?.data?.pdfs || []);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  return { pdfs, setPdfs, loading };
}
