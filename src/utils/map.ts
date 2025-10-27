import { countryMap } from '@/constants';

export const countCountries = (data: { country: string }[]) => {
  const map = new Map<string, number>();

  for (const item of data) {
    map.set(item.country, (map.get(item.country) || 0) + 1);
  }

  return Array.from(map.entries()).map(([country, count]) => ({
    country,
    name: countryMap[country],
    count,
  }));
};
