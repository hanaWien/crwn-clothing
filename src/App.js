import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import './App.css';

class App extends React.Component {
  /*constructor(){
    super();
    
    this.state = {
      currentUser: null
    };
  }
  */
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          /* 
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          },()=>{
            console.log(this.state);
          })*/
        }) 
      }
      else{
        setCurrentUser(null);
        /*this.setState({
          currentUser: null
        })*/
      }
      //createUserProfileDocument(user);
      //this.setState({currentUser: user});
      //console.log(this.state.currentUser);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
     
  }


 render(){ 
  return (
    <div> 
     {/*<Header currentUser={this.state.currentUser}/>*/}
     <Header/>
      <Switch>
        <Route exact path ='/' component={HomePage} />
        <Route path='/shop' component={ShopPage}/>
        <Route path = '/signin' render ={()=>this.props.currentUser ? (<Redirect to ='/' />) :(<SignInAndSignUpPage/>)}/>
      </Switch>
    </div>
  );
 }
}

const mapStateToProps = ({user})=>({
  currentUser: user.currentUser 
})

const mapDispatchToProps = dispatch=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
