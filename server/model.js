import mongoose from "mongoose";

const restaurantMenu = mongoose.Schema({
  resId: String,
  name: String,
  url: String,
  menu: [
    {
      price: Number,
      title: String,
      uri: String,
    },
  ],
});

const PostMessage = mongoose.model("restaurantMenu", restaurantMenu);

export default PostMessage;
