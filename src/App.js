import React from 'react';
import './App.css';

import NavigationBar from './components/navigation-bar/navigation-bar.component'
import AddBook from './components/add-book/add-book.component';
import AddType from './components/add-type/add-type.component';
import AddAuthor from './components/add-author/add-author.component';

import HomePage from './pages/home/home.component';
import Register from './pages/register/register.component';
import SignIn from './pages/sign-in/sign-in.component';
import NewUserBook from './pages/new-user-book/new-user-book.component';

import ROUTES from './routes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRoute: '',
      user: {
        signIn: false,
        email: '', 
        name: '',
        id: ''
      }
    }
  }
  
  componentDidMount(){
    this.checkLocalStorage()
    .then(()=>{
      this.onRouteChange(this.state.activeRoute)
    })
    
  }

  checkLocalStorage = async () => {
    return new Promise((resolve, reject) => {
      if(!this.state.user.signIn && localStorage.getItem('bookRegisterName') && localStorage.getItem('bookRegisterEmail')){
        this.setState({
         activeRoute: ROUTES.HOME_PAGE,
         user: {
           signIn: true,
           name: localStorage.getItem('bookRegisterName'),
           email: localStorage.getItem('bookRegisterEmail'),
           id: localStorage.getItem('bookRegisterId')
       }})
       resolve(true);
     }else{
      resolve(false);
     }
    })
  }

  onRouteChange = (route) => {
    if(route === ROUTES.SIGN_OUT) {
      this.signOut()
      this.setState({activeRoute: ROUTES.SIGN_IN})
    }else{
      if(!this.state.user.signIn && route !== ROUTES.REGISTER ) route=ROUTES.SIGN_IN;
        this.setState({activeRoute: route})
    }
  }

  loadUser = (user) =>{
    this.setState(
      {
        user: {
          name: user.name,
          email: user.email,
          signIn: true,
          id: user.id
        }
      }
     )
     localStorage.setItem('bookRegisterName', user.name)
     localStorage.setItem('bookRegisterEmail', user.email)
     localStorage.setItem('bookRegisterId', user.id)
  }

  signOut = () => {
    return new Promise((resolve, reject) => {
        this.setState({user: {
          signIn: false,
          name: '',
          email: ''
        }})
        localStorage.removeItem('bookRegisterName');
        localStorage.removeItem('bookRegisterEmail');
        localStorage.removeItem('bookRegisterId');
    })
  }

  render(){
    return (
      <div className="app">
        <NavigationBar user = {this.state.user} onRouteChange={this.onRouteChange}/>
        <div className="below-nav">
          {(this.state.activeRoute===ROUTES.HOME_PAGE)?<HomePage  onRouteChange={this.onRouteChange}/>:null}
          {(this.state.activeRoute===ROUTES.REGISTER)?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:null}
          {(this.state.activeRoute===ROUTES.SIGN_IN)?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:null}
          {(this.state.activeRoute===ROUTES.ADD_BOOK)?<AddBook onRouteChange={this.onRouteChange} user={this.state.user} />:null}
          {(this.state.activeRoute===ROUTES.ADD_TYPE)?<AddType onRouteChange={this.onRouteChange} />:null}
          {(this.state.activeRoute===ROUTES.ADD_AUTHOR)?<AddAuthor onRouteChange={this.onRouteChange} user={this.state.user}/>:null}
          {(this.state.activeRoute===ROUTES.NEW_USER_BOOK)?<NewUserBook onRouteChange={this.onRouteChange} user={this.state.user}/>:null}
        </div>
      </div>
    );
  }
}
  


export default App;
