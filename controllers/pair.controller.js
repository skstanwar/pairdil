import { sql } from "../config/superbase.js";
import { generateBase64String } from "../utils/base64.util.js";

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

export const paircodeverify =(req, res)=>{
    res.send("this is under maintanance")
}