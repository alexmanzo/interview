import { WALT_DISNEY_ENTITY_ID } from "@/constants";
import type { EntityLiveDataResponse } from "@/types/parks-api";

const BASE_URL = 'https://api.themeparks.wiki/v1';

export async function getLiveData(parkId: string): Promise<EntityLiveDataResponse> {
  const response = await fetch(`${BASE_URL}/entity/${parkId}/live?entityType=ATTRACTION`);
  if (!response.ok) {
    throw new Error(`Error fetching live park data: ${response.statusText}`);
  }
  return response.json() as Promise<EntityLiveDataResponse>;
}

export async function getLiveParkData(): Promise<EntityLiveDataResponse> {
  const response = await fetch(`${BASE_URL}/entity/${WALT_DISNEY_ENTITY_ID}/live?entityType=PARK`);
  if (!response.ok) {
    throw new Error(`Error fetching park data: ${response.statusText}`);
  }
  return response.json() as Promise<EntityLiveDataResponse>;
}