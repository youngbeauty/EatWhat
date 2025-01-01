import React from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";
import "./Card.css";
/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
const CommentsBlock = (props) => {
  return (
    <div className="Card-commentSection">
      {props.comments.map((comment) => (
        <SingleComment
          key={`SingleComment_${comment._id}`}
          _id={comment._id}
          creator_name={comment.creator_name}
          creator_id={comment.creator_id}
          content={comment.content}
        />
      ))}
      {props.userId && <NewComment storyId={props.story._id} addNewComment={props.addNewComment} />}
    </div>
  );
};

export default CommentsBlock;
