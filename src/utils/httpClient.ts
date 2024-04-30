const BASE_URL = "https://github.com/AnastassiaH/product_catalog/tree/main/public/api";

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url, {
    mode: 'no-cors'
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }
    return response.json();
  });
}
