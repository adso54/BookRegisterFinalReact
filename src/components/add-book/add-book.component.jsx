import React from 'react';
import './add-book.styles.scss';
// import ROUTES from '../../routes';

class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            createUserId: '',
            addedBookId: null,
            error: null
        }
    }

    componentDidMount () {
        this.setState({createUserId: this.props.user.id})
    }
    
    onSubmit = () =>{
        this.setState({addedBookId: null}); 
        console.log(new Date().toISOString().replace('T',' ').replace('Z',''));
        fetch('http://localhost:8080/book/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                createUser: this.state.createUserId,
                createDate: new Date().toISOString().replace('T',' ').replace('Z','')
            })
        })
        .then(response => response.json())
        .then(bookId => {
            if(bookId.name === 'error'){
                this.setState({error: bookId.code});
                setTimeout(() =>{this.setState({error: null})}, 3000);
            }else {
                if(bookId){
                    console.log(bookId);
                    this.setState({addedBookId: bookId});
                    this.clearForm();
                    setTimeout(() =>{this.setState({addedBookId: null})}, 3000);
                }
            }
        })
        .catch(err =>console.log(err));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    clearForm = () => {
        this.setState({title: '', description: ''})
    }

    render() {
        return(
            <article>
                <fieldset>
                    <legend>Dodaj książkę do listy książek</legend>
                    <div>
                        <label htmlFor="title">Tytuł </label>
                        <input type="text" id="title" name="title" onChange={this.onChange} value={this.state.title}/>
                    </div>
                    <div>
                        <label htmlFor="description">Opis </label>
                        <input type="text" id="description" name="description" onChange={this.onChange} value={this.state.description}/>
                    </div>
                </fieldset> 
                <input type="submit" value="Dodaj książkę" onClick={this.onSubmit}/>
                {this.state.addedBookId ? 
                    <p>Książka zostła dodana do spisu książek</p>
                : null
                }
                {this.state.error ? 
                    <p>Wystąpił błąd podczas dodawania książki! Kod błędu: {this.state.error}</p>
                : null
                }
            </article>
        )
    }  
}

export default AddBook;