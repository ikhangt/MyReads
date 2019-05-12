import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  closeSearch = () => this.setState({ showSearchPage: false })
  editBooks = (originalShelfValue,finalShelfValue,book) => {
    console.log(`originalShelfValue: ${originalShelfValue} finalShelfValue: ${finalShelfValue}`)
    let booksCopy = this.state.books;
    
    if(originalShelfValue === 'none'){
      book.shelf = this.shelfValueMap[finalShelfValue];
      booksCopy.push(book)
    } else {
      booksCopy.map((curBook) =>{ //need to update the db here aswell
        if(curBook.author == book.author 
          && curBook.title == book.title){
          curBook.shelf = this.shelfValueMap[finalShelfValue];
          BooksAPI.update(curBook,finalShelfValue)
        }
      })
    }
    console.log("book: ")
    console.log(booksCopy)
    this.setState({books: booksCopy})
  }
  getAuthors(dbBookEntry){
    if(dbBookEntry.authors !== undefined){
      return dbBookEntry.authors.map((author,index,authors)=>{
        if(index !== authors.length-1 && authors !== 0)
          return author+", "
        else
          return author
        })        
    }
  }
  cleanDBBookEntry = (dBBookEntry) => {
    if(dBBookEntry){
      let title = dBBookEntry.title
      let author = this.getAuthors(dBBookEntry)
      let shelf = this.shelfValueMap[dBBookEntry.shelf]
      let id = dBBookEntry.id
      let url
      try{
        url = dBBookEntry.imageLinks.thumbnail
      } catch {
        url = null
      }
      return {title:title, author:author, url:url, shelf:shelf, id:id}
    }
      
    
  }
  updateBooks = () =>{
    BooksAPI.getAll().then((searchResults) =>{
      if(searchResults !== undefined && searchResults.error === undefined) {
        let books = searchResults.map((dBBookEntry) => {
          return this.cleanDBBookEntry(dBBookEntry)
        })
        this.setState({books: books})
        console.log(this.state.books)
      }
    })
  }
shelfValueMap = {"currentlyReading":"Currently Reading",
                 "wantToRead":"Want to Read",
                 "read":"Read"}
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
  }
  
  
  render() {
    if (this.state.books.length === 0){
      this.updateBooks();
    }
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage searchValue closeSearch = {this.closeSearch} foundBooks = {this.state.foundBooks} editBooks ={this.editBooks} cleanDBBookEntry={this.cleanDBBookEntry} books = {this.state.books}/>
        ) : (

          <div className="list-books">
            <div className="list-books-title">
              <h1>{'My Reads'}</h1>{/*editRequired*/}
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books = {this.state.books} bookShelfTile = "Currently Reading" editBooks ={this.editBooks}/>
                <Shelf books = {this.state.books} bookShelfTile = "Want to Read" editBooks ={this.editBooks}/>
                <Shelf books = {this.state.books} bookShelfTile = "Read" editBooks ={this.editBooks}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
