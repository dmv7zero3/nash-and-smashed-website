//src/core/env
interface EnvWindow extends Window {
  __ENV__?: { [key: string]: string };
}

export const getEnvVar = (key: string, fallback: string = ""): string => {
  if (typeof window !== "undefined") {
    return (window as EnvWindow).__ENV__?.[key] || fallback;
  }
  return process?.env?.[key] || fallback;
};

// export const GOOGLE_MAPS_API_KEY = "AIzaSyBFUIzxEwVOnNgLtjKbUi2sLhdw0EbdPjw";
export const GOOGLE_MAPS_API_KEY = "AIzaSyAZ_6Zuz7gzfmZEzK_0TvX7k75-U4fYYUg";
