import React from 'react'


export default class Comments extends React.Component {

   constructor(props){
    super(props);
    this.state = {
      content: ''
    }
    this.onSumbitHandler = this.onSumbitHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    }

  onChangeHandler(event){
    const contentVal = event.target.value
    this.setState({content: contentVal
    })
  }

  onSumbitHandler(event){
    const userId = this.props.userId
    const inputObj = { user_id: userId, content: this.state.content, itemId: this.props.itemId}
    this.props.submitHandler(inputObj)
  }

  render() {
    const allComments = this.props.allComments

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
      {this.props.userId &&
      <form className="mui-form" onSubmit={this.onSumbitHandler}>
        <legend>Comment</legend>
        <div className="mui-textfield">
          <input type="text" placeholder="Input 1" onChange={this.onChangeHandler} />
        </div>
        <button type="submit" className="mui-btn mui-btn--raised">Submit</button>
      </form>
    }
    </div>
  )
  }


}
