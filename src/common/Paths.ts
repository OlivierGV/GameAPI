/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/jeux',
    GetBy: '/nom/:terme',
    GetRating: '/rating/:min/:max',
    GetAll: '/',
    Add: '/',
    Update: '/',
    Delete: '/theme/:theme',
  },
} as const;
