"use server";

import { getCars } from "@/actions/get-cars";
import { FilterProps } from "@/types";

export async function fetchCars(filter: FilterProps) {
  const response = await getCars(filter);
  return response;
}
