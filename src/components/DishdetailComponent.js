import React,{ Component } from 'react'
import { Card, CardBody, CardText, CardImg, CardTitle } from 'reactstrap';


class DishDetail extends Component {

  renderComments(dish) {
    const comments = dish.comments.map((comment) => {
      return (
          <div className="container">
            <div key={comment.id}>
                <ul>{comment.comment}</ul>
                <ul>-- {comment.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</ul>
            </div>
          </div>
        
        )
      })
    if (dish.comments.length === 0) {
      return <div></div>
    } else {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardBody>
              <CardText>
                <h4>Comments</h4>
                {comments}
              </CardText>
            </CardBody>
          </Card>
        </div>
      )
    }
  }

  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" object src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }

  render() {
    if (this.props.dish === null) {
      return (<div></div>);
    } 
    else {
      return (
        <div className="container">
            <div key={this.props.dish.id} className="row">
                {this.renderDish(this.props.dish)}
                {this.renderComments(this.props.dish)}
            </div>
        </div>
        
      );
    }
  }
}

export default DishDetail;