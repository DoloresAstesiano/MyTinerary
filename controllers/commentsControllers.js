const Itinerary = require('../models/itineraryModel')

const commentsControllers = {

  addComment: async (req, res) => {
    const { itinerary, comment } = req.body.comment
    const user = req.user._id
    try {
      const newComment = await Itinerary.findOneAndUpdate({ _id: itinerary }, { $push: { comments: { comment: comment, userId: user } } }, { new: true })
      res.json({ success: true, response: { newComment }, message: "Thanks you for let us your comment" })

    }
    catch (error) {
      console.log(error)
      res.json({ success: false, message: "Something went wrong try again in a few minutes" })
    }

  },
  modifyComment: async (req, res) => {

    const { comment } = req.body.comment
    const commentID = req.params.id
    // const user = req.user._id; descomentar
    //console.log(req.body)

    try {
      const newComment = await Itinerary.findOneAndUpdate(
        { "comments._id": commentID },
        { $set: { "comments.$.comment": comment } },
        { new: true }
      );
      //console.log(newComment);
      res.json({
        success: true,
        response: { newComment },
        message: "Your comment has been modified",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: true,
        message: "Something went wrong, please try again in a few seconds",
      });
    }
  },
  removeComment: async (req, res) => {
    const id = req.params.id
    // const user = req.user._id
    try {
      const removeComment = await Itinerary.findOneAndUpdate({ "comments._id": id }, { $pull: { comments: { _id: id } } }, { new: true })
      console.log(removeComment)
      res.json({ success: true, response: { removeComment }, message: "You deleted the comment" })

    }
    catch (error) {
      console.log(error)
      res.json({ success: false, message: "Something went wrong try again in a few minutes" })
    }
  },
}
module.exports = commentsControllers