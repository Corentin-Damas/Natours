import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  try {
    const url =
      type == "password"
        ? "http://127.0.0.1:3000/api/v1/users/updateMyPassword"
        : type == "review"
        ? `http://127.0.0.1:3000/api/v1/reviews/${data.id}`
        : type == "tour"
        ? `http://127.0.0.1:3000/api/v1/tours/${data.id}`
        : type == "userEdit"
        ? `http://127.0.0.1:3000/api/v1/users/${data.id}`
        : "http://127.0.0.1:3000/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      withCredentials: true, // Include credentials (cookies)
      headers: {
        "Content-Type": "application/json",
      },
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully ! `);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};
export const deleteSetting = async (id, type) => {
  try {
    const url = `http://127.0.0.1:3000/api/v1/reviews/${id}`;

    const res = await axios({
      method: "DELETE",
      withCredentials: true, // Include credentials (cookies)
      headers: {
        "Content-Type": "application/json",
      },
      url,
    });
    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} DELETION successfully ! `);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};
