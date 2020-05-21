import React from 'react';
import './new-user-book.styles.scss';

import Dropdown from '../../components/fields/dropdown/dropdown.component';

class NewUserBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            books: [],
            booksList: []
        }
    }

    componentDidMount() {
        this.setState({userId: this.props.user.id});
        this.userBooks();
    }

    bookList(books) {
        const booksList = [];
        books.map(book =>{
            return booksList.push({id: book.id, value: book.title})
        })
        this.setState({booksList: booksList});
    }

    userBooks = () => {
        const url = `http://localhost:8080/book`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({books: data});
            this.bookList(data);

    })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h1>Hello</h1>
                <Dropdown key="1" name="Wybierz książkę" values={this.state.booksList}/>
            </div>
            
        )
    }
}


export default NewUserBook;