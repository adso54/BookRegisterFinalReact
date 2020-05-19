import React from 'react';
import './add-type.styles.scss';

class AddType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            description: '',
            addedTypeId: null
        }
    }

    onChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    clearForm = () =>{
        this.setState({type: '', description: ''})
    }

    onSubmit = () =>{
        this.setState({addedBookId: null}); 
        console.log(new Date().toISOString())
        fetch('http://localhost:8080/type/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: this.state.type,
                description: this.state.description
            })
        })
        .then(response => response.json())
        .then(type => {
            if(type){
                console.log(type);
                this.setState({addedTypeId: type.id});
                this.clearForm();
                setTimeout(() => {this.setState({addedTypeId: null})},3000)
            }
        })
        .catch(err =>console.log(err));
        
        
    }


    render(){
        return(
            <article>
                <fieldset>
                    <legend>Add type of book</legend>
                    <div>
                        <label htmlFor="type">Typ </label>
                        <input type="text" id="type" name="type" onChange={this.onChange} value={this.state.type}/>
                    </div>
                    <div>
                        <label htmlFor="description">Opis </label>
                        <input type="text" id="description" name="description" onChange={this.onChange} value={this.state.description}/>
                    </div>
                </fieldset> 
                <input type="submit" value="Dodaj typ" onClick={this.onSubmit}/>
                <div>
                    {this.state.addedTypeId ? 
                         <p>Nowy typ został dodany</p>
                    : null
                    }
                </div>
            </article>
        )
    }
}


export default AddType;