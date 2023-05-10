const baseUrl = process.env.TMDB_BASE_URL;
const tmdbKey = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}/${endpoint}?api_key=${tmdbKey}&${qs}`;
};

export default { getUrl };
