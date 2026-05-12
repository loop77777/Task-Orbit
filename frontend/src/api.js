const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Something went wrong while calling the API.");
  }

  if (response.status === 204) {
    // Delete endpoint intentionally returns no payload.
    return null;
  }

  return response.json();
};

export const taskApi = {
  list: () => request("/tasks"),
  create: (data) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id, data) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  remove: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE"
    })
};
