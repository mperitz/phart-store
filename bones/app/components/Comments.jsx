import React from 'react'


export default function Comments (props) {

  const allComments = props.allComments

  return (
    <div className="comments">
        {
          allComments && allComments.map(comment => (
          <div key={comment.id}>
            <h3>{ comment.user.name }</h3>
            <h4>{comment.content}</h4>
          </div>
        ))
      }
    </div>
  );
}
