import type { EntityLiveDataResponse } from "@/types/parks-api";

const BASE_URL = 'https://api.themeparks.wiki/v1';

export async function getLiveData(parkId: string): Promise<EntityLiveDataResponse> {
  const response = await fetch(`${BASE_URL}/entity/${parkId}/live?entityType=ATTRACTION`);
  if (!response.ok) {
    throw new Error(`Error fetching destinations: ${response.statusText}`);
  }
  return response.json() as Promise<EntityLiveDataResponse>;
}