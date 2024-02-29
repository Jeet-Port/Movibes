import userModel from "../models/user.model.js";
import ticketBookingModel from "../models/ticketBooking.model.js"
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName, isAdmin } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser) return responseHandler.badrequest(res, "username already used");

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.isAdmin=isAdmin;
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
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await userModel.findOne({ username }).select("username password salt id displayName");
  
      if (!user) return responseHandler.badrequest(res, "User not exist");
  
      if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");
  
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
        id: user.id
      });
    } catch {
      responseHandler.error(res);
    }
  };  

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel.findById(req.user.id).select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    console.error("Error updating password:", error);
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {

    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

const bookTicket = async (req, res) => {
  try {
    const data = req.body;
    data["username"] = req.user.displayName;

    const existingBooking = await ticketBookingModel.findOne({
      username: data.username,
      mediaName: data.mediaName,
    });

    if (existingBooking) {
      existingBooking.seats = [...existingBooking.seats, ...data.seats];
      existingBooking.seats = existingBooking.seats.filter(seat => seat !== null);
      await existingBooking.save();

      return responseHandler.ok(res, existingBooking);
    } else {
      const ticket = new ticketBookingModel(data);
      await ticket.save();

      return responseHandler.ok(res, ticket);
    }
  } catch (error) {
    console.error("Error booking ticket:", error);
    return responseHandler.error(res);
  }
};


const getAllSeats = async (req, res) => {
  try {
    const seats = await ticketBookingModel.find();

    responseHandler.ok(res, seats);

  } catch (error) {
    console.error("Error fetching seats:", error);
    responseHandler.error(res, "Error fetching seats");
  }
};

const userTicket = async (req, res) => {
  try {
    const user = req.user.username
    const ticket = await ticketBookingModel.find({  username: user });

    responseHandler.ok(res, ticket);

  } catch (error) {
    console.error("Error fetching user Ticket:", error);
    responseHandler.error(res, "Error fetching user ticket");
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
  bookTicket,
  getAllSeats,
  userTicket,
};