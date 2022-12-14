import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginRoute = {
  path: "/api/login",
  method: "post",

  handler: async (req, res) => {
    const { email, password, verificationString } = req.body;

    const db = await getDbConnection("cols");

    const user = await db
      .collection("users")
      .findOne({ email, verificationString });

    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found please create, Account" });
    }
    if (user) {
      await db.collection("users").findOneAndUpdate(
        { email },
        {
          $set: {
            isVerified: true,
          },
        }
      );
    }

    const { _id: id, passwordHash, salt, isVerified } = user;
    const pepper = process.env.PEPPER_STRING;

    const isPassCorrect = await bcrypt.compare(
      salt + password + pepper,
      passwordHash
    );

    if (!isPassCorrect) {
      return res.status(401).json({ message: "password is incorrect" });
    }

    jwt.sign(
      {
        id,
        email,
        isVerified,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        res.status(200).json({ token });
      }
    );
  },
};
