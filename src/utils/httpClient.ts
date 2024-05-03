 const BASE_URL = "https://github.com/AnastassiaH/product_catalog";

const API_ENDPOINT = `${BASE_URL}/public/api`;
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'

export function getData<T>(url: string): Promise<T> {
  return fetch(PROXY_URL + API_ENDPOINT + url).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.text}`);
    }
    return response.json();
  });
}

