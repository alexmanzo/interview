import type { EntityLiveDataResponse, LiveDataParams } from '@/types/parks-api';

const BASE_URL = 'https://api.themeparks.wiki/v1';

export async function getLiveData({ parkId, entityType }: LiveDataParams): Promise<EntityLiveDataResponse> {
  const response = await fetch(`${BASE_URL}/entity/${parkId}/live?entityType=${entityType}`);
  if (!response.ok) {
    throw new Error(`Error fetching live park data: ${response.statusText}`);
  }
  return response.json() as Promise<EntityLiveDataResponse>;
}
