import tmdbConfig from "./tmdb.config";

const tmdnEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, page),
  mediaDetail: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}`),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  mediaImages: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
  mediaRecommend: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.getUrl(`search/${mediaType}`, { query, page }),
  personDetail: ({ personId }) => tmdbConfig.getUrl(`person/${personId}`),
  personMedias: ({ personId }) =>
    tmdbConfig.getUrl(`person/${personId}/combined_credits`),
};

export default tmdnEndpoints;
