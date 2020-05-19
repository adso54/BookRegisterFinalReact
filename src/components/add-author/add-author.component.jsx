import React from 'react';
import './add-author.styles.scss';

class AddAuthor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            createUserId: null,
            description: '',
            createdAuthorId: null
        }
    }

    componentDidMount () {
        this.setState({createUserId: this.props.user.id})
    }

    onSubmit = () =>{
        this.setState({addedBookId: null}); 
        console.log(new Date().toISOString())
        fetch('http://localhost:8080/author/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                description: this.state.description,
                createUser: this.state.createUserId,
                createDate: new Date().toISOString().replace('T',' ').replace('Z','')
            })
        })
        .then(response => response.json())
        .then(authorId => {
            if(authorId){
                this.setState({createdAuthorId: authorId});
                this.clearForm();
                setTimeout(() =>{this.setState({createdAuthorId: null})}, 3000);
            }
        })
        .catch(err =>console.log(err));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    clearForm = () => {
        this.setState({firstName: '', lastName: '', description: ''})
    }

    render() {
        return(
            <article>
                <fieldset>
                    <legend>Dodaj autora do listy</legend>
                    <div>
                        <label htmlFor="firstName">Imię </label>
                        <input type="text" id="firstName" name="firstName" onChange={this.onChange} value={this.state.firstName}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Nazwisko </label>
                        <input type="text" id="lastName" name="lastName" onChange={this.onChange} value={this.state.lastName}/>
                    </div>
                    <div>
                        <label htmlFor="description">Opis </label>
                        <input type="text" id="description" name="description" onChange={this.onChange} value={this.state.description}/>
                    </div>
                </fieldset> 
                <input type="submit" value="Dodaj autora" onClick={this.onSubmit}/>
                {this.state.createdAuthorId ? 
                    <p>Autor został dodany do listy</p>
                : null
                }
            </article>
        )
    }  
}


export default AddAuthor;