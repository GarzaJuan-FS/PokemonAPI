const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: { validator: validateEmail, message: "Email Invalid" },
  },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
