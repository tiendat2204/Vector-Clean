export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi lấy dữ liệu: ${error.message}`);
    throw error;
  }
}

export async function putData(url, data) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };  

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          window.location.href = "../index.html";
          return;
        }

        const refreshResponse = await fetch("http://localhost:3000/users/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error(`Error refreshing token: ${refreshResponse.status}`);
        }

        const { accessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return await putData(url, data);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating data: ${error.message}`);
    throw error;
  }
}
export async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi xóa dữ liệu: ${error.message}`);
    throw error;
  }
}
export async function postData(url, data) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          window.location.href = "../index.html";
          return;
        }

        const refreshResponse = await fetch("http://localhost:3000/users/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error(`Error refreshing token: ${refreshResponse.status}`);
        }

        const { accessToken, refreshToken: newRefreshToken } =
          await refreshResponse.json();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return await postData(url, data);
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Error sending data: ${error.message}`);
    throw error;
  }
}