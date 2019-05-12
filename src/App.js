import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  closeSearch = () => this.setState({ showSearchPage: false })
  editBooks = (originalShelfValue,finalShelfValue,book) => {
    console.log(`originalShelfValue: ${originalShelfValue} finalShelfValue: ${finalShelfValue}`)
    let booksCopy = this.state.books;
    
    if(originalShelfValue == 'none'){
      book.shelf = this.shelfValueMap[finalShelfValue];
      booksCopy.push(book)
    } else {
      booksCopy.map((curBook) =>{
        if(curBook.author == book.author 
          && curBook.title == book.title){
          curBook.shelf = this.shelfValueMap[finalShelfValue];
        }
      })
    }
    console.log("book: ")
    console.log(booksCopy)
    this.setState({books: booksCopy})
  
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
    books:[{
      title:"To Kill a Mo-ckingbird",
      author:"Harper Lee",
      url:"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
      shelf:"Currently Reading"
    },{
      title:"Ender's Game",
      author:"Orson Scott Card",
      url:"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
      shelf:"Currently Reading"
    },
    {
      title:"1776",
      author:"David McCullough",
      url:"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
      shelf:"Want to Read"
    },
    {
      title:"The Hobbit",
      author:"J.R.R Tolkien",
      url:"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
      shelf:"Read"
    }
    ],
  }
  
  
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage searchValue closeSearch = {this.closeSearch} foundBooks = {this.state.foundBooks} editBooks ={this.editBooks} books = {this.state.books}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>{this.state.selectValue}</h1>{/*editRequired*/}
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
