import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import { Link } from 'react-router-dom';
import './BookList.css'; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data); // Initially display all books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filterAndSortBooks = () => {
      let filtered = books.filter(book => {
        const bookName = book.name ? book.name.toLowerCase() : '';
        const bookGenre = book.genre ? book.genre.toLowerCase() : '';
        return (
          bookName.includes(searchName.toLowerCase()) &&
          bookGenre.includes(searchGenre.toLowerCase())
        );
      });

      filtered = sortBooks(filtered, sortOption);
      setFilteredBooks(filtered);
    };

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

    filterAndSortBooks();
  }, [searchName, searchGenre, sortOption, books]);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearchGenreChange = (e) => {
    setSearchGenre(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <h1>Book List</h1>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <input
          type="text"
          placeholder="Search by genre"
          value={searchGenre}
          onChange={handleSearchGenreChange}
        />
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="mostRead">Most Read</option>
          <option value="mostWantToRead">Most Want to Read</option>
          <option value="highestRating">Highest Rating</option>
        </select>
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
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
