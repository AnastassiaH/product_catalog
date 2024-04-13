import { Phone } from "../types";
import { getData } from "../utils/httpClient";

export function getPhones() {
  return getData<Phone[]>("/phones.json");
}
