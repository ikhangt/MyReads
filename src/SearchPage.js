import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'


class SearchPage extends Component {
  state ={
    searchValue: '',
    foundBooks:[],
  }

  syncFoundBookWithShelfs(book){
    let booksCopy = this.props.books;
    // eslint-disable-next-line array-callback-return
    booksCopy.map((curBook) => {
      if(curBook.id === book.id){
          book.shelf = curBook.shelf
        }
    })
    return book
  }

  handleChange = (event) => {
    this.setState({searchValue: event.target.value})
    BooksAPI.search(event.target.value)
         .then((searchResults) => {
          this.setState({foundBooks:[]})
           if(searchResults !== undefined && searchResults.error === undefined){
            let foundbooks = []
            searchResults.map((searchResult)=>
            {
              let book = this.props.cleanDBBookEntry(searchResult)
              book = this.syncFoundBookWithShelfs(book);
              foundbooks.push(book)
            }
            )
            console.log(foundbooks)
            this.setState({foundBooks:foundbooks})                     
           }
         })
  }
  render() {
    return (
      <div className="search-books" >
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.closeSearch}>Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" value = {this.state.searchValue} placeholder="Search by title or author" onChange = {this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map((book)=>{
              return (<li><Book title = {book.title} author = {book.author} url = {book.url} shelf = {book.shelf} id = {book.id} editBooks ={this.props.editBooks}/></li>) 
              })}
            
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;