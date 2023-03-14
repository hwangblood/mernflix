import privateClient from "../client/private.client";
import publicCLient from "../client/public.client";

const userEndpoint = {
  signin: "user/signin",
  signup: "user/singup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
  getFavorites: "user/favorites",
  addFavorite: "user/favorites",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicCLient.post(userEndpoint.signin, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicCLient.post(userEndpoint.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoint.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoint.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
