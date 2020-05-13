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
    this.onRouteChange(this.state.activeRoute)
  }

  onRouteChange = (route) => {
    console.log(route)
    if(route === 'signOut') {
      this.setState({user: {
        signIn: false,
        name: '',
        email: ''
      }})
    }
    if(!this.state.user.signIn && route !== 'register' ) route='signIn';
    console.log(route)
    this.setState({activeRoute: route})
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
