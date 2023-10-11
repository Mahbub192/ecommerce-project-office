import { connectToDatabase } from "./mongo";
const bcrypt = require("bcrypt");

export default async function userAccountCreate(req, res) {
  try {
    // Connect to the database
    const userCollection = await connectToDatabase().db("myShopdb").collection("userCreates");

    if (req.method === "POST") {
      // Extract user data from the request body
      const user = req.body;

      // Hash the user's password for security
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }

      // Check if the user with the same email already exists
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        // User with the same email already exists
        return res
          .status(409)
          .json({ message: "User already exists", status: 409 });
      }

      // Save the user's personal information in the database
      const result = await userCollection.insertOne(user);

      // Respond with a success message and status
      res.status(200).json({
        message: "Data inserted into the database successfully",
        status: 200,
        data: result,
      });
    }
  } catch (error) {
    console.error(error);

    // Handle any errors and respond with an error message and status
    res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}
