import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

//import BookShelfChanger from './BookShelfChanger.js'


class Book extends Component {
  book = {
    title: this.props.title,
    author: this.props.author,
    url: this.props.url,
    shelf: this.props.shelf,
    id: this.props.id,
  }
  

  shelfValueMap = {"Currently Reading":"currentlyReading",
                  "Want to Read":"wantToRead",
                  "Read":"read"}
  initialShelf = () => { 
    if(this.shelfValueMap[this.props.shelf]){
      return this.shelfValueMap[this.props.shelf]
    } else {
      return 'none'
    }
  }
  setShelf = (value)=>{
    let originalShelfValue = this.state.shelf
    this.setState({
      shelf: value
    })
    let finalShelfValue = value
    console.log(this.props)
    this.props.editBooks(originalShelfValue,finalShelfValue,this.book)
  }
  state = {
    shelf: this.initialShelf()
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("'+this.props.url+'")' }}></div>
          <BookShelfChanger setSelectValue={this.setShelf} shelf={this.state.shelf} book = {this.book}/>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    )
  }
}

export default Book;

function BookShelfChanger (props) {
  return (
  <div className="book-shelf-changer">
  <select 
    onChange={ (event) => {props.setSelectValue(event.target.value)} } 
    value={props.shelf}
  >
      <option value="move" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead" >Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
  </select>
  </div>
  )
}