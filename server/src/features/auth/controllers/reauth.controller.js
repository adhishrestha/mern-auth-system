import { reauthenticateUser } from "../services/reauth.service.js";

const reauthenticateController = async (req, res, next) => {
  try {
    const { method, password, idToken } = req.body;

    const reauthData = await reauthenticateUser(req.user._id.toString(), {
      method,
      password,
      idToken,
    });

    res.status(200).json({
      success: true,
      message: "Re-authentication successful.",
      data: reauthData,
    });
  } catch (error) {
    next(error);
  }
};

export { reauthenticateController };
