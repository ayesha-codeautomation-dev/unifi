import axios from "axios";

export const loginUser = async (credentials) => {
  return await axios.post("http://localhost:5000/unifi/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getSites = async (controllerUrl, session) => {
  return await axios.post(
    "http://localhost:5000/unifi/user/sites",
    { controllerUrl },
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `unifi_session=${session}`,
      },
    }
  );
};
