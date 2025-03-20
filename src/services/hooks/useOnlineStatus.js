import { API_URL } from "config/apiHandler";
import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(null);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/ping`);
      setIsOnline(response.ok);
    } catch (error) {
      setIsOnline(false);
    }
  };

  const checkInternetConnection = () => {
    if (navigator.onLine) {
      checkApiStatus();
    } else {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    window.addEventListener("online", checkInternetConnection);
    window.addEventListener("offline", checkInternetConnection);

    return () => {
      window.removeEventListener("online", checkInternetConnection);
      window.removeEventListener("offline", checkInternetConnection);
    };
  }, []);

  const resetIsOnline = () => {
    setIsOnline(null);
  };

  return { isOnline, resetIsOnline };
};

export default useOnlineStatus;
