import React from 'react';
import './sign-in.styles.scss';
import ROUTES from '../../routes';


class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    onSubmit = () =>{
        fetch('http://localhost:8080/user/signIn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
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
            <div className="signIn"> 
                <fieldset>
                    <legend>Sign in form</legend>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={this.onChange}/>
                    </div>
                    </fieldset> 
                    <input type="submit" value="Sign in" onClick={this.onSubmit}/>
               
            </div>
           )
    }
}

export default SignIn;