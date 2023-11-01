import { FilterProps } from "@/types";
import axios from "axios";

export async function getCars(filter: FilterProps) {
  const options = {
    method: "GET",
    url: `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`,
    params: {
      make: filter.manufacturer,
      model: filter.model,
      fuel_type: filter.fuel,
      year: filter.year,
      limit: filter.limit,
    },
    headers: {
      "X-RapidAPI-Key": "59dcee28cdmsh230c3de2077d44ep19ccfcjsnacc67bbede86",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
}
