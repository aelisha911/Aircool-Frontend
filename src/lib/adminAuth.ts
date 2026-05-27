const ADMIN_SESSION_KEY = "aircool_admin_authenticated";
const ADMIN_LOGIN_PATH = "/api/admin/login";

type AdminLoginResponse = {
  success?: boolean;
  token?: string;
  user?: {
    email?: string;
    role?: string;
  };
};

export const adminLogin = async (email: string, password: string) => {
  try {
    
    const baseUrl =
  import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCALHOST 
    : import.meta.env.VITE_API_URL ;
    
    const response = await fetch(
      `${baseUrl}${ADMIN_LOGIN_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      throw new Error(`Login request failed with ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    let payload: AdminLoginResponse | null = null;

    if (contentType.includes("application/json")) {
      try {
        payload = (await response.json()) as AdminLoginResponse;
      } catch {
        payload = null;
      }
    }

    const isValid =
      payload === null ||
      payload.success === true ||
      Boolean(payload.token) ||
      payload.user?.email !== undefined;

    if (isValid) {
      localStorage.setItem(ADMIN_SESSION_KEY, "true");
      if (payload?.token) {
        localStorage.setItem("aircool_admin_token", payload.token);
      }
    }

    return isValid;
  } catch {
    return false;
  }
};

export const isAdminAuthenticated = () => localStorage.getItem(ADMIN_SESSION_KEY) === "true";

export const adminLogout = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};
