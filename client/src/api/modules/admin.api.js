import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const adminEndpoints = {
    add: "admin/add",
    remove: ({mediaId}) => `admin/remove/${mediaId}`,
    getMovie: ({ mediaId }) => `admin/getMovie/${mediaId}`
};

const adminApi = {
    add: async ({ mediaId, normal, executive, premium, isAvailable }) => {
        try {
            const response = await privateClient.post(
                adminEndpoints.add,
                { mediaId, isAvailable, normal, executive, premium }
            );

            return { response }
        } catch (err) {
            console.error("Error in adminApi.add:",err);
            return {
                err: {
                  status: err.response?.status || 500,
                  message: err.message || 'Internal Server Error',
                  data: err.response?.data || null,
                },
            };
        }
    },
    remove: async ({ mediaId }) => {
        try{
            const response = await privateClient.delete(
                adminEndpoints.remove({ mediaId }),
            );
            
            return {response}
        } catch (err) {
            console.error("Error in adminApi.remove:",err);
            return {
                err: {
                  status: err.response?.status || 500,
                  message: err.message || 'Internal Server Error',
                  data: err.response?.data || null,
                },
            };
        }
    },
    getMovie: async ({ mediaId }) => {
        try{
            const response = await publicClient.get(
                adminEndpoints.getMovie({ mediaId })
            );
            return {response}
        } catch (err) {
            console.error("Error in adminApi.getMovies:",err);
            return {
                err: {
                  status: err.response?.status || 500,
                  message: err.message || 'Internal Server Error',
                  data: err.response?.data || null,
                },
            };
        }
    }
}

export default adminApi;