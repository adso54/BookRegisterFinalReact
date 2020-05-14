import React from 'react';
import './App.css';

import NavigationBar from './components/navigation-bar/navigation-bar.component'
import HomePage from './pages/home/home.component';
import Register from './pages/register/register.component';
import SignIn from './pages/sign-in/sign-in.component';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeRoute: '',
      user: {
        signIn: false,
        email: '', 
        name: ''
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
         activeRoute: 'homePage',
         user: {
           signIn: true,
           name: localStorage.getItem('bookRegisterName'),
           email: localStorage.getItem('bookRegisterEmail')
       }})
       resolve(true);
     }else{
      resolve(false);
     }
    })
  }

  onRouteChange = (route) => {
    if(route === 'signOut') {
      this.signOut()
      this.setState({activeRoute: 'signIn'})
    }else{
      if(!this.state.user.signIn && route !== 'register' ) route='signIn';
        this.setState({activeRoute: route})
    }
  }

  loadUser = (user) =>{
    this.setState(
      {
        user: {
          name: user.name,
          email: user.email,
          signIn: true
        }
      }
     )
     localStorage.setItem('bookRegisterName', user.name)
     localStorage.setItem('bookRegisterEmail', user.email)
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
    })
  }

  render(){
    return (
      <div className="app">
        <NavigationBar user = {this.state.user} onRouteChange={this.onRouteChange}/>
        {(this.state.activeRoute==='homePage')?<HomePage onRouteChange={this.onRouteChange}/>:null}
        {(this.state.activeRoute==='register')?<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:null}
        {(this.state.activeRoute==='signIn')?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>:null}
      </div>
    );
  }
}
  


export default App;
