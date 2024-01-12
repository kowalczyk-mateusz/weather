export const weatherKeys = {
  all: ['weather'] as const,
  lists: () => [...weatherKeys.all, 'lists'] as const,
  list: (cityName: string) => [...weatherKeys.lists(), cityName] as const,
  details: () => [weatherKeys.all, 'details'] as const,
  detail: (cityName: string, lat?: number, lon?: number) =>
    [...weatherKeys.details(), cityName, lat, lon] as const,
};
