import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
  passwordModifiedTime: {
    type: Date,
  },
});

userSchema.methods.checkPasswordLastModifytime = async function (iat) {
  if (this.passwordModifiedTime) {
    const changeTime = parseInt(this.passwordModifiedTime.getTime() / 1000, 10);
    // if Change time > iat mean password was changed
    return changeTime > iat;
  }

  return false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (plainTextPass, hashPass) {
  return (await plainTextPass) === hashPass;
};

const User = new mongoose.model("User", userSchema);

export default User;
