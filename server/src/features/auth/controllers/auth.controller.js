import { getAuthHealth } from "../services/auth.service.js";

const authHealth = (req, res) => {
  const response = getAuthHealth();

  res.status(200).json(response);
};

export { authHealth };
