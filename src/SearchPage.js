import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'


class SearchPage extends Component {
  state ={
    searchValue: '',
    foundBooks:[],
  }
  getAuthors(searchResult){
    if(searchResult.authors != undefined){
      //console.log("search: " + JSON.stringify(searchResult.title))
      return searchResult.authors.map((author,index,authors)=>{
        if(index != authors.length-1 && authors != 0)
          return author+", "
        else
          return author
          
        })        
    }
  }

  syncFoundBookWithShelfs(book){
    let booksCopy = this.props.books;
    booksCopy.map((curBook) =>{
      //console.log(`book + ${JSON.stringify(book.title)} \n curBook + ${JSON.stringify(curBook.title)} \n ${curBook.title === book.title}`)
      if(curBook.title === book.title){
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
              let book = {title:searchResult.title, author:this.getAuthors(searchResult), url:searchResult.imageLinks.thumbnail}
              book = this.syncFoundBookWithShelfs(book);
              //console.log(book)
              foundbooks.push({title:searchResult.title, author:this.getAuthors(searchResult), url:searchResult.imageLinks.thumbnail, shelf:book.shelf})
            }
            )
            console.log(foundbooks)
            this.setState({foundBooks:foundbooks})                     
           }
         })
    BooksAPI.getAll()
         .then((searchResult) =>{
           console.log(searchResult)
         })
  }
  render() {
    return (
      <div className="search-books" >
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.closeSearch}>Close</button>
          <div className="search-books-input-wrapper">
            {
              /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value = {this.state.searchValue} placeholder="Search by title or author" onChange = {this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map((book)=>{
              return (<li><Book title = {book.title} author = {book.author} url = {book.url} shelf = {book.shelf} editBooks ={this.props.editBooks}/></li>) 
              })}
            
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;