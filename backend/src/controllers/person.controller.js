import responseHandler from "../handles/response.handler";
import tmdbAPI from "../tmdb/tmdb.api";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbAPI.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch (error) {
    responseHandler.error(error);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbAPI.personMedias({ personId });

    responseHandler.ok(res, medias);
  } catch (error) {
    responseHandler.error(error);
  }
};

export default { personDetail, personMedias };
