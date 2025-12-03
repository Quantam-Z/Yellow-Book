import { defineEventHandler, getQuery } from 'h3';
import { searchDirectoryListings } from '~/server/utils/directory';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const result = await searchDirectoryListings(query);

  return {
    data: result.items,
    meta: {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      pageSize: result.pageSize,
      hasNext: result.hasNext,
      hasPrevious: result.hasPrevious,
      priceRange: result.priceRange,
    },
  };
});
