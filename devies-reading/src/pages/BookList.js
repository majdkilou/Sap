import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import { Link } from 'react-router-dom';
import './BookList.css'; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const sortBooks = (books, option) => {
    switch (option) {
      case 'mostRead':
        return books.sort((a, b) => b.haveRead - a.haveRead);
      case 'mostWantToRead':
        return books.sort((a, b) => b.wantToRead - a.wantToRead);
      case 'highestRating':
        return books.sort((a, b) => b.averageRating - a.averageRating);
      case 'name':
      default:
        return books.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBooks = sortBooks([...books], sortOption);

  return (
    <div>
      <h1>Book List</h1>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="mostRead">Most Read</option>
          <option value="mostWantToRead">Most Want to Read</option>
          <option value="highestRating">Highest Rating</option>
        </select>
      </div>
      <div className="book-list">
        {sortedBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.coverUrl} alt={book.name} />
            <h2>{book.name}</h2>
            <p>Genre: {book.genre}</p>
            <p>Average Rating: {book.averageRating}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
