const API_URL = "http://localhost:5000/api";

export const fetchData = async (limit = 1000) => {
  const res = await fetch(`${API_URL}/data?limit=${limit}`);
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Failed to fetch data");
  }
  return res.json();
};

export const postData = async (data) => {
  const res = await fetch(`${API_URL}/data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Rate Limit Exceeded");
    }
    throw new Error("Failed to post data");
  }
  return res.json();
};
