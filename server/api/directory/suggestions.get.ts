import { defineEventHandler, getQuery } from 'h3';
import { getDirectoryListings } from '~/server/utils/directory';

const normalize = (value?: string | string[]) => {
  const target = Array.isArray(value) ? value[0] : value;
  return String(target ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = normalize(query.q);
  const parsedLimit = Number(Array.isArray(query.limit) ? query.limit[0] : query.limit);
  const limit = clamp(Number.isFinite(parsedLimit) ? parsedLimit : 12, 1, 50);

  const listings = await getDirectoryListings();

  const matches = listings
    .filter((listing) => {
      if (!search) return true;
      return listing.searchHaystack.includes(search);
    })
    .slice(0, limit)
    .map((listing) => ({
      title: listing.title,
      slug: listing.slug,
      id: listing.id,
      category: listing.category,
    }));

  return {
    data: matches,
    meta: {
      total: matches.length,
    },
  };
});
