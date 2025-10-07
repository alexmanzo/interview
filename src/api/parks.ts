import { MAGIC_KINGDOM_ENTITY_ID } from "@/constants";

const BASE_URL = 'https://api.themeparks.wiki/v1';

export async function getLiveData() {
  const response = await fetch(`${BASE_URL}/entity/${MAGIC_KINGDOM_ENTITY_ID}/live?entityType=ATTRACTION`);
  if (!response.ok) {
    throw new Error(`Error fetching destinations: ${response.statusText}`);
  }
  return response.json();
}