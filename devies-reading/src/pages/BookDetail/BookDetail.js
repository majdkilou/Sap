import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  getBook,
  rateBook,
  addBookStatus,
  updateBookStatus,
  getUser,
} from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import ReactStars from 'react-rating-stars-component';
import './BookDetail.css'; // Import the CSS file

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookAndUser = async () => {
      try {
        const bookData = await getBook(id);
        setBook(bookData);
        setSelectedRating(bookData.userRating);

        if (user) {
          const userData = await getUser(user.userId);
          const bookStatus = userData.shelf.find((item) => item.bookId === id);
          if (bookStatus) {
            setSelectedStatus(bookStatus.status);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBookAndUser();
  }, [id, user]);

  const handleRatingChange = async (nextValue) => {
    setSelectedRating(nextValue);
    try {
      const updatedBook = await rateBook(id, nextValue);
      setBook(updatedBook);
    } catch (error) {
      console.error('Error rating book:', error);
    }
  };

  const handleStatusChange = async (status) => {
    setSelectedStatus(status);
    try {
      if (selectedStatus) {
        // Update existing status with PUT request
        await updateBookStatus(user.userId, id, status);
      } else {
        // Add new status with POST request
        await addBookStatus(user.userId, id, status);
      }
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-detail">
      <h1>{book.name}</h1>
      <img src={book.coverUrl} alt={book.name} />
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Average Rating:</strong> {book.averageRating}
      </p>
      <p>
        <strong>Have Read:</strong> {book.haveRead}
      </p>
      <p>
        <strong>Currently Reading:</strong> {book.currentlyReading}
      </p>
      <p>
        <strong>Want to Read:</strong> {book.wantToRead}
      </p>
      <p>
        <strong>User Rating:</strong> {book.userRating}
      </p>
      {user && (
        <>
          <div>
            <label htmlFor="status">Update Status:</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="haveRead">Have Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
            </select>
          </div>
          <div className="star-rating">
            <label htmlFor="rating">Rate this book:</label>
            <ReactStars
              count={5}
              value={selectedRating}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetail;
