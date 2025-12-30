import { useState, useRef, useCallback } from "react";
import axios from "axios";

const DEBOUNCE_DELAY = 2000;

export function useUsernameAvailability() {
  const [status, setStatus] = useState(null);
  // null | "checking" | "available" | "taken"

  const debounceTimerRef = useRef(null);
  const abortControllerRef = useRef(null);

  // 1️⃣ Pure API logic (no debounce)
  const checkUsernameAvailability = useCallback(async (username) => {
    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await axios.get("http://localhost:4000/api/v1/auth/check-availability", {
        params: { username },
        signal: controller.signal,
      });

      setStatus(res.data.usernameAvailability ? "available" : "taken");
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        return;
      }
      setStatus(null);
    }
  }, []);

  // 2️⃣ Debounce wrapper (timing only)
  const debouncedCheckUsername = useCallback(
    (username) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      setStatus("checking");

      debounceTimerRef.current = setTimeout(() => {
        checkUsernameAvailability(username);
      }, DEBOUNCE_DELAY);
    },
    [checkUsernameAvailability]
  );

  // 3️⃣ Reset helper
  const reset = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setStatus(null);
  }, []);

  return {
    status,
    checkUsername: debouncedCheckUsername,
    reset,
  };
}
