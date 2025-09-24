import { sql } from "../config/superbase.js";
import { generateBase64String } from "../utils/base64.util.js";
import User from "../models/user.model.js";
export const paircodegenerator = async (req, res) => {
  try {
    const base64String = generateBase64String(); // Generate unique public ID
    const userId = req.user.userId; // Assumes middleware added user to request

    // Insert into publicidtable
    // Delete existing row for this userID (if any)
    await sql`
      DELETE FROM publicidtable
      WHERE "userID" = ${userId}
    `;

    // Insert new row
    await sql`
      INSERT INTO publicidtable ("publicID", "userID")
      VALUES (${base64String}, ${userId})
    `;

    res.status(201).json({
      message: "Public ID generated and saved successfully",
      publicID: base64String,
    });
  } catch (error) {
    console.error("Error in paircodegenerator:", error.message);
    res.status(500).json({
      message: "Failed to generate or insert public ID",
      error: error.message,
    });
  }
};

export const paircodeverify = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user?.userId; // Assuming JWT middleware adds this

    if (!code) {
      return res.status(400).json({ message: "❌ Code is required" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }
      // Check if the user is already paired
    const user = await User.findById(userId);
    if (user.partnerId){
    // set null to partnerId and set null to partnerId of partner
      await User.findByIdAndUpdate(userId, { partnerId: null }, { new: true });
      await User.findByIdAndUpdate(user.partnerId, { partnerId: null }, { new: true });
    }
    // Step 1: Get partnerId from SQL
    const result = await sql`
      SELECT "userID" 
      FROM publicidtable 
      WHERE "publicID" = ${code}
      LIMIT 1;
    `;

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Invalid or expired publicID" });
    }

    const partnerId = result[0].userID;

    if (partnerId === userId) {
      return res.status(400).json({ message: "You cannot pair with yourself" });
    }

    // Step 2: Update both users in MongoDB
    await Promise.all([
      User.findByIdAndUpdate(userId, { partnerId }, { new: true }),
      User.findByIdAndUpdate(partnerId, { partnerId: userId }, { new: true }),
    ]);

    console.log(`🔗 Users paired: ${userId} <-> ${partnerId}`);

    return res.status(200).json({
      message: "✅ Pairing successful",
      partnerId,
    });
  } catch (error) {
    console.error("❌ Error verifying paircode:", error);
    return res
      .status(500)
      .json({ message: "Server error while verifying paircode" });
  }
};

export const unpair = async (req, res) =>{
  try
    // complete the unpair function
    const userId = req.user?.userId;
    const user = await User.findById(userId);
    if (!user.partnerId){
      return res.status(400).json({ message: "You are not paired with anyone" });
    }
    await User.findByIdAndUpdate(userId, { partnerId: null }, { new: true });
    await User.findByIdAndUpdate(user.partnerId, { partnerId: null }, { new: true });
  
}