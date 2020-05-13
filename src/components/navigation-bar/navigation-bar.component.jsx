import React from 'react';
import './navigation-bar.styles.scss';

const NavigationBar = ({onRouteChange, user}) => {
    const {signIn, name} = user;
    return (
        <nav className="navigation-bar" >
            {signIn ? 
                <div>
                    <p>Hi {name}!</p>
                    <p className="option-link" onClick={() => onRouteChange('signOut')}>Sign out</p>
                </div>
            : 
                <div>
                    <p className="option-link" onClick={() => onRouteChange('signIn')}
                    >Sign in                
                    </p>
                    <p className="option-link" onClick={() => onRouteChange('register')}
                    >Register                
                    </p>
                </div>
            }
           
        </nav>
    )
}


export default NavigationBar;