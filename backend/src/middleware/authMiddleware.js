import { verifyToken } from "../utils/generateToken.js";
import { User } from "../models/User.js";

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("waterPlan");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
