import React, { useEffect, useState, useContext } from 'react';
import { getUser, getBook } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './MyBooks.css'; // Import the CSS file

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (user) {
        try {
          const userData = await getUser(user.userId);
          const booksWithDetails = await Promise.all(
            userData.shelf.map(async (shelfItem) => {
              const bookDetails = await getBook(shelfItem.bookId);
              return { ...shelfItem, ...bookDetails };
            })
          );
          setBooks(booksWithDetails);
        } catch (error) {
          console.error('Error fetching user books:', error);
        }
      }
    };
    fetchUserBooks();
  }, [user]);

  if (!user) return <div>Please log in to view your books.</div>;

  return (
    <div className="my-books">
      <h1>My Books</h1>
      {books.length === 0 ? (
        <p>You have no books in your shelf.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.bookId} className="book-card">
              <Link to={`/book/${book.bookId}`}>
                <img src={book.coverUrl} alt={book.name} />
                <h2>{book.name}</h2>
              </Link>
              <p>Status: {book.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
