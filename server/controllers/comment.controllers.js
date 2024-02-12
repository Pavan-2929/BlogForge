import Comment from "../models/comment.model.js";
import errorHandler from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.id.toString()) {
      return next(errorHandler(400, "You are not Authorized"));
    }

    const comment = await Comment.create({ content, userId, postId });

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const showComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if(!comment){
        return next(errorHandler(404, "Comment not found"))
    }

    const userIndex = comment.likes.indexOf(req.id)

    if(userIndex === -1){
        comment.numberOfLikes += 1;
        comment.likes.push(req.id)
    }
    else{
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1)
    }
    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
      return next(errorHandler(404, "Comment not found"))
    }

    if(comment.userId !== req.id.toString()){
      return next(errorHandler(400, "you are not owner of the content"))
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {content: req.body.content}, {new: true})

    res.status(200).json(updatedComment)
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
      return next(errorHandler(404, "Comment not found"))
    }

    if(comment.userId !== req.id.toString()){
      return next(errorHandler(400, "You are not owner of the content"))
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment deleted")
  } catch (error) {
    next(error)
  }
}