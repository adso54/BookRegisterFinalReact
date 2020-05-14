import React from 'react';
import './navigation-bar.styles.scss';

const NavigationBar = ({onRouteChange, user}) => {
    const {signIn, name} = user;
    return (
        <nav  >
            {signIn ? 
                <div className="navigation-bar">
                    <p className="item">Hi {name}!</p>
                    <p className="item option-link" onClick={() => onRouteChange('signOut')}>Sign out</p>
                </div>
            : 
                <div className="navigation-bar">
                    <p className="item option-link" onClick={() => onRouteChange('signIn')}
                    >Sign in                
                    </p>
                    <p className="item option-link" onClick={() => onRouteChange('register')}
                    >Register                
                    </p>
                </div>
            }
           
        </nav>
    )
}


export default NavigationBar;