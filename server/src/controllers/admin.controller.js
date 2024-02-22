import responseHandler from "../handlers/response.handler.js";
import availablemovieModel from "../models/availablemovie.model.js";

const add = async (req, res) => {
    try {
        const isAvailable = await availablemovieModel.findOne({
            mediaId: req.body.mediaId
        });

        if (isAvailable) {
            await availablemovieModel.findOneAndUpdate(
                { mediaId: req.body.mediaId },
                { 
                    $set: { 
                        isAvailable: req.body.isAvailable,
                        normal: req.body.normal,
                        executive: req.body.executive,
                        premium: req.body.premium
                    }
                },
                { new: true }
            );
            return responseHandler.ok(res, isAvailable);
        }        
        
        const availableMovie = new availablemovieModel({
            ...req.body,
        })
        await availableMovie.save()

        responseHandler.ok(res, availableMovie);
    } catch {
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    try {
        const { mediaId } = req.params;

        const deletedMovie = await availablemovieModel.findOneAndDelete({
            mediaId: mediaId
        });

        if (!deletedMovie) {
            return responseHandler.notfound(res);
        }
        responseHandler.ok(res);
    } catch (error) {
        responseHandler.error(res, error);
    }
};

const getMovie = async (req, res) => {
    try {
        const { mediaId } = req.params; 

        const movie = await availablemovieModel.findOne({ mediaId });
        if (!movie) {
            return responseHandler.notfound(res);
        }

        responseHandler.ok(res, movie);
    } catch (error) {
        responseHandler.error(res, error);
    }
};

export default {
    add,
    remove,
    getMovie,
}