import React from 'react';
import './navigation-bar.styles.scss';
import ROUTES from '../../routes';

const NavigationBar = ({onRouteChange, user}) => {
    const {signIn, name} = user;
    return (
        <nav  >
            {signIn ? 
                (<div className="navigation-bar">
                    <div className="nav-group right-menu">
                        <p className="item">Cześć {name}!</p>
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.SIGN_OUT)}>Wyloguj</p>
                    </div>
                    <div className="nav-group left-menu">
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.ADD_BOOK)}>Dodaj książkę</p>
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.ADD_TYPE)}>Dodaj typ</p>
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.ADD_AUTHOR)}>Dodaj autora</p>
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.NEW_USER_BOOK)}>Dodaj nową książkę do swojej biblioteki</p>
                    </div>
                </div>)   
            : 
                <div className="navigation-bar">
                    <div className="nav-group right-menu">
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.SIGN_IN)}
                        >Zaloguj               
                        </p>
                        <p className="item option-link" onClick={() => onRouteChange(ROUTES.REGISTER)}
                        >Zarejestruj                
                        </p>
                    </div>
                </div>
            }
           
        </nav>
    )
}


export default NavigationBar;