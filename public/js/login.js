import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      withCredentials: true, // Include credentials (cookies)
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.status === 200) {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/overview");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      // withCredentials: true, // Include credentials (cookies)
      // headers: {
      //   "Content-Type": "application/json",
      // },
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if (res.status === 200) location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out ! Try again");
  }
};
