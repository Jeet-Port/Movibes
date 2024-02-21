import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const userEndpoints = {
    signin: "user/signin",
    signup: "user/signup",
    getInfo: "user/info",
    passwordUpdate: "user/update-password",
}

const userApi = {
    signin: async ({ username, password}) => {
        try {
            const response = await  publicClient.post(
                userEndpoints.signin,
                { username, password }
            );

            return { response }
        } catch (err) {
            console.error('Error in userApi.signin:', err);
            return {
              err: {
                status: err.response?.status || 500,
                message: err.message || 'Internal Server Error',
                data: err.response?.data || null,
              },
            };
          }
    },
    signup: async ({ username, password, confirmPassword, displayName, isAdmin }) => {
        try {
          const response = await publicClient.post(
            userEndpoints.signup,
            { username, password, confirmPassword, displayName, isAdmin }
          );
    
          console.log("signup response", response);
          return { response };
        } catch (err) {
          console.error("signup error", err);
          return { err };
        }
      },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo);

            return { response };
        } catch (err) { return { err }; }
    },
    passwordUpdate: async ({ password, newPassword, confirmNewPassword}) => {
        try {
            const response = await privateClient.put(
                userEndpoints.passwordUpdate,
                { password, newPassword, confirmNewPassword}
            )
            

            return { response }
        } catch (err) { console.log(err);return { err }; }
    }
};

export default userApi;