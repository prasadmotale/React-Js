import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import About from './AboutComponent';
import { addComment,fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotion: state.promotion,
    leaders: state.leaders 
  }
}

const mapDispatchToProps = (dispatch) =>({
  addComment: (dishId,rating,author,comment)=> dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: ()=> {dispatch(fetchDishes())}
})

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render() {

    const HomePage = (props) =>{
        return(
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errmess}
                promotion={this.props.promotion.filter((promotion) => promotion.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errmess} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment} />
      );
    };
  
    return (
      <div>
        <Header/>
            <Switch>
                <Route path="/home" component={ HomePage }/>
                <Route exact path="/menu" component={ () => <Menu dishes= {this.props.dishes} /> }/>
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path="/contactus" component={Contact}/>
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                <Redirect to= "/home" />
            </Switch>
        <Footer/>
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));