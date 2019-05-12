import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'


class Shelf extends Component {

  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTile}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map((book) => {
            if(this.props.bookShelfTile == book.shelf){
              return(
                <li> <Book title = {book.title} author = {book.author} url = {book.url} shelf ={book.shelf} 
                editBooks ={this.props.editBooks}/> </li>
              )
            }  
          })}
          </ol>
        </div>
      </div>
    )
  }
}
export default Shelf;

