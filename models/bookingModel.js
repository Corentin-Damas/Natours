const mongoose = require("mongoose");

const bookingShema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    require: [true, "Booking must belong to a Tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Booking must belong to a Tour"],
  },
  price: {
    type: Number,
    require: [true, "Booking mus have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingShema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "name",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingShema);

module.exports = Booking;
