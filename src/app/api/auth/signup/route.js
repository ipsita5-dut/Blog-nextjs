import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    // ✅ Parse and validate body
    const body = await req.json();
    const { username, email, password, birthday, gender } = body;

    if (!username || !email || !password || !birthday || !gender) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // ✅ Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      birthday,
      gender,
    });

    await newUser.save();

    // ✅ Ensure JWT_SECRET is available
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET not found in environment");
      return new Response(
        JSON.stringify({ message: "Server misconfiguration" }),
        { status: 500 }
      );
    }

    // ✅ Sign token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // ✅ Success
    return new Response(
      JSON.stringify({ message: "User registered successfully", token }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API Error:", error);
    return new Response(
      JSON.stringify({
        message: "Server error",
        error: error.message || "Unknown error",
      }),
      { status: 500 }
    );
  }
}
