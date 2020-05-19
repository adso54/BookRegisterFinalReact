import React from 'react';
import './register.styles.scss';
import ROUTES from '../../routes';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: ''
        };
    }

    onChange = (e) =>{
        const {name, value } = e.target;
        this.setState({[name]: value})
    }

    onSubmit = () =>{
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange(ROUTES.HOME_PAGE);
            }
        })
        .catch(err =>console.log(err));
    }

    render(){
        return(
            <div className="register"> 
                <fieldset>
                    <legend>Register form</legend>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={this.onChange}/>
                    </div>
                    </fieldset> 
                    <input type="submit" value="Register" onClick={this.onSubmit}/>
               
            </div>
           )
    }
}

export default Register;