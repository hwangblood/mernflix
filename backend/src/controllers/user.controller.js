import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user.model";
import responseHandler from "../handles/response.handler";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });
    if (checkUser)
      return responseHandler.badrequest(res, "username already used");

    const user = userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);
    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(error);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password, salt id displayName");
    if (!user) return responseHandler.badrequest(res, "user not exist");

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badrequest(req, "Wrong password");

    user.setPassword(newPassword);

    await user.save();
    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(error);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(error);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
};
