import responseHandler from "../handlers/response.handler.js";
import FavoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await FavoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new FavoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await FavoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorites = await FavoriteModel.find({ user: req.user.id }).sort(
      "-createdAt"
    );

    responseHandler.ok(res, favorites);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
