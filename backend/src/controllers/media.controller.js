import responseHandler from "../handlers/response.handler";
import tokenMiddleware from "../middlewares/token.middleware";
import favoriteModel from "../models/favorite.model";
import reviewModel from "../models/review.model";
import userModel from "../models/user.model";
import tmdbAPI from "../tmdb/tmdb.api";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbAPI.mediaList({
      mediaType,
      mediaCatrgory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(erro);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbAPI.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(error);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbAPI.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    responseHandler.ok(res, response);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };

    const media = await await tmdbAPI.mediaDetail(params);

    media.credits = await tmdbAPI.mediaCredits(params);

    const videos = await tmdbAPI.mediaVideos(params);
    media.videos = videos;

    const recommend = await tmdbAPI.mediaRecommend(params);
    media.recommend = recommend.results;

    media.images = await tmdbAPI.mediaImages(params);

    const tokenDecodeed = tokenMiddleware.tokenDecode(req);

    if (tokenDecodeed) {
      const user = await userModel.findById(tokenDecodeed.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (error) {
    responseHandler.error(error);
  }
};

export default { getList, getGenres, search, getDetail };
