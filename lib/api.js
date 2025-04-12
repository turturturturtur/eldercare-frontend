const API_BASE_URL = "http://localhost:8000";  // 后端 FastAPI 地址

// 搜索 & 分页
export async function fetchUsers(search = "", skip = 0, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/users/?search=${search}&skip=${skip}&limit=${limit}`);
    return response.json();
}

// 创建用户
export async function createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
}

// 删除用户
export async function deleteUser(userId) {
    await fetch(`${API_BASE_URL}/users/${userId}`, { method: "DELETE" });
}



// 更新用户
export async function updateUser(userId, userData) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
}

// 创建预约
export async function createAppointment(appointmentData) {
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
    });
    return response.json();
}

// 获取用户所有预约
export async function fetchAppointments(userId) {
    const response = await fetch(`${API_BASE_URL}/appointments/${userId}`);
    return response.json();
}

// 取消预约
export async function deleteAppointment(appointmentId) {
    await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, { method: "DELETE" });
}

// 记录健康数据
export async function createHealthData(healthData) {
    const response = await fetch(`${API_BASE_URL}/health/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(healthData),
    });
    return response.json();
}

// 获取用户健康数据
export async function fetchHealthData(userId) {
    const response = await fetch(`${API_BASE_URL}/health/${userId}`);
    return response.json();
}

// 用户注册
export async function registerUser(userData) {
    const response = await fetch("/api/auth/register", { // ✅ 现在可以使用 "/api/" 了
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("注册失败");
    }

    return await response.json();
}

