import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    favorites: [
      {
        cca3: { type: String },
        name: { type: String },
        flag: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
