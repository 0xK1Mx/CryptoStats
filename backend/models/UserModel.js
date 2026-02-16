import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "This email is already associated with an account"],
    valide: {
      validator: validator.isEmail,
      message: "Please provide an valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (passwordConfirm) {
        return this.password === passwordConfirm;
      },
      message: "Password does not match",
    },
    select: false,
  },
  passwordModifiedTime: Date,
  passwordResetToken: String,
  passwordResetTokenExpiration: Date,
});

userSchema.methods.checkPasswordLastModifytime = async function (iat) {
  if (this.passwordModifiedTime) {
    const changeTime = parseInt(this.passwordModifiedTime.getTime() / 1000, 10);
    // if Change time > iat mean password was changed
    return changeTime > iat;
  }

  return false;
};

userSchema.methods.createResetToken = async function () {
  //Generate that token
  const token = crypto.randomBytes(32).toString("hex");

  //Hash that password
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetTokenExpiration = Date.now() + 10 * 60 * 1000;

  return token;
};

userSchema.pre("save", async function () {
  if (!this.isModified("password") || this.isNew) return;

  this.passwordModifiedTime = Date.now() - 1000;
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (plainTextPass, hashPass) {
  return bcrypt.compare(plainTextPass, hashPass);
};

const User = new mongoose.model("User", userSchema);

export default User;
