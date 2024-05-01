// const BASE_URL = "https://github.com/AnastassiaH/product_catalog/public/api";

// export function getData<T>(url: string): Promise<T> {
//   return fetch(BASE_URL + url).then((response) => {
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.text}`);
//     }
//     return response.json();
//   });
// }

const URL = "https://anastassiah.github.io/product_catalog";

const API_ENDPOINT = `${URL}/api/`;

export async function getData<T>(url: string): Promise<T | null> {
  const response = await fetch(`${API_ENDPOINT}${url}`);

  if (!response || !response.ok) {
    throw new Error(`Error occurred: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return data;
}
