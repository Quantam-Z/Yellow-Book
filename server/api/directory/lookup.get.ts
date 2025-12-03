import { createError, defineEventHandler, getQuery } from 'h3';
import { getDirectoryListings } from '~/server/utils/directory';
import { categoryService } from '@/services/categoryService';

const normalize = (value?: string | string[]) => {
  const target = Array.isArray(value) ? value[0] : value;
  return String(target ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const slugRaw = normalize(query.slug);
  const idRaw = Array.isArray(query.id) ? query.id[0] : query.id;
  const titleRaw = normalize(query.title);
  const qRaw = normalize(query.q);

  if (!slugRaw && !idRaw && !titleRaw && !qRaw) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Provide slug, id, title, or q to lookup a directory listing',
    });
  }

  const listings = await getDirectoryListings();

  const slugTarget = slugRaw ? categoryService.slugifyName(slugRaw) : '';
  const titleTarget = titleRaw ? categoryService.normalizeName(titleRaw) : '';

  let match =
    (slugTarget && listings.find((listing) => listing.slug === slugTarget)) ||
    (idRaw && listings.find((listing) => String(listing.id) === String(idRaw))) ||
    (titleTarget && listings.find((listing) => listing.normalizedTitle === titleTarget)) ||
    (qRaw && listings.find((listing) => listing.searchHaystack.includes(qRaw))) ||
    null;

  if (!match) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Directory listing not found',
    });
  }

  return {
    data: match,
  };
});
