import { MAGIC_KINGDOM_ENTITY_ID } from "@/constants";
import type { EntityLiveDataResponse } from "@/types/parks-api";

const BASE_URL = 'https://api.themeparks.wiki/v1';

export async function getLiveData(): Promise<EntityLiveDataResponse> {
  const response = await fetch(`${BASE_URL}/entity/${MAGIC_KINGDOM_ENTITY_ID}/live?entityType=ATTRACTION`);
  if (!response.ok) {
    throw new Error(`Error fetching destinations: ${response.statusText}`);
  }
  return response.json() as Promise<EntityLiveDataResponse>;
}