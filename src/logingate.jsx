import { useEffect, useState } from "react";

const isExtension =
  typeof chrome !== "undefined" &&
  chrome?.identity &&
  chrome?.storage;

export default function LoginGate() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (isExtension) {
      chrome.storage.local.get(["googleToken"], (result) => {
        if (result?.googleToken) setIsLoggedIn(true);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = () => {
    console.log("LOGIN CLICKED");

    if (!isExtension) {
      setIsLoggedIn(true);
      return;
    }

    setAuthLoading(true);

    chrome.storage.local.get(["googleToken"], (result) => {
      if (result?.googleToken) {
        chrome.identity.removeCachedAuthToken({ token: result.googleToken }, () => {
          requestToken();
        });
      } else {
        requestToken();
      }
    });
  };

  const requestToken = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      setAuthLoading(false);

      if (chrome.runtime.lastError) {
        console.error("AUTH ERROR:", chrome.runtime.lastError.message);
        return;
      }

      if (!token) {
        console.error("NO TOKEN");
        return;
      }

      chrome.storage.local.set({ googleToken: token }, () => {
        setIsLoggedIn(true);
      });
    });
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative">
      {isLoggedIn && (
        <div className="w-full h-full bg-zinc-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">New Tab 🚀</h1>
          <p className="text-zinc-400">User is logged in</p>
        </div>
      )}

      {!isLoggedIn && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <div className="w-full max-w-sm px-6 text-center">
            <h2 className="text-2xl font-bold mb-6">Sign in to continue</h2>

            <button
              onClick={login}
              disabled={authLoading}
              className="
                w-full
                flex items-center justify-center gap-3
                border border-gray-300
                rounded-xl
                py-3
                font-medium
                transition
                active:scale-95
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.63 1.22 9.1 3.22l6.8-6.8C35.68 2.38 30.2 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.92 6.15C12.3 13.05 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.55c0-1.6-.14-2.77-.43-3.98H24v7.54h12.7c-.26 2.1-1.67 5.26-4.83 7.38l7.4 5.74c4.32-4 7.83-9.9 7.83-16.68z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.48 28.37c-.52-1.55-.82-3.2-.82-4.87s.3-3.32.8-4.87l-7.92-6.15C.92 15.98 0 19.87 0 24c0 4.13.92 8.02 2.54 11.52l7.94-6.15z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.2 0 11.4-2.05 15.2-5.58l-7.4-5.74c-2 1.4-4.58 2.38-7.8 2.38-6.3 0-11.7-3.55-13.5-8.47l-7.94 6.15C6.5 42.62 14.62 48 24 48z"
                />
              </svg>

              {authLoading ? "Signing in..." : "Continue with Google"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
