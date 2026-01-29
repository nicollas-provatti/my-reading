const API_URL = import.meta.env.VITE_API_URL;

export async function uploadCover(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/cover`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw error;
  }

  const data = await response.json();
  return data.url;
}
