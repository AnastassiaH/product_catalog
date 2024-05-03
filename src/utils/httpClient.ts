 const BASE_URL = "https://github.com/AnastassiaH/product_catalog";

const API_ENDPOINT = `${BASE_URL}/api`;

export function getData<T>(url: string): Promise<T> {
  return fetch('http://localhost:3000/api' + url).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }
    return response.json();
  });
}

