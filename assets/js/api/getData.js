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
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi cập nhật dữ liệu: ${error.message}`);
    throw error;
  }
}

export async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
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
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi gửi dữ liệu: ${error.message}`);
    throw error;
  }
}
