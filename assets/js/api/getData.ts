export async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) { 
      console.error(`Lỗi khi lấy dữ liệu: ${(error as Error).message}`);
      throw error;
    }
  }
  
export async function putData(url: string, data: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
} catch (error: any) { 
    console.error(`Lỗi khi cập nhật dữ liệu: ${error.message}`);
    throw error;
  }
}

export async function deleteData(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
} catch (error: any) { 
    console.error(`Lỗi khi xóa dữ liệu: ${error.message}`);
    throw error;
  }
}

export async function postData(url: string, data: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.status}`);
    }

    return await response.json();
} catch (error: any) { 
    console.error(`Lỗi khi gửi dữ liệu: ${error.message}`);
    throw error;
  }
}
