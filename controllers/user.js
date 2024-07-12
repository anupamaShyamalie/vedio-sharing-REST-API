import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

//update user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account..!!"));
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted successfully...!!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account..!!"));
  }
};

//get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

//subscribe vedio
export const subscribeVideo = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("subscription successfull..!!");
  } catch (err) {
    return next(err);
  }
};

//unsubscribe the vedio
export const unsubscribeVideo = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("unsubscription successfull..!!");
  } catch (err) {
    return next(err);
  }
};

//like to vedio
export const likeVideo = async (req, res, next) => {
  const id = req.user?.id;
  const videoId = req.params.id;

  try {
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      },
      { new: true, upsert: false }
    );
    res.status(200).json("Video has been liked!");
  } catch (err) {
    next(err);
  }
};

//dislike video
export const dislikeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.id;
  if (!id) {
    return res.status(401).json("User not authenticated");
  }

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    if (!videoId) {
      return res.status(404).json("Video not found!");
    }
    res.status(200).json("The video has been disliked!");
  } catch (err) {
    return next(err);
  }
};
