import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the API call
jest.mock('../services/api', () => ({
  getBooks: jest.fn(() => Promise.resolve([
    {
      id: '1',
      name: 'Book One',
      genre: 'Fiction',
      coverUrl: 'http://example.com/book1.jpg',
      averageRating: 4.5,
      haveRead: 100,
      currentlyReading: 50,
      wantToRead: 200,
      userRating: 4
    },
    {
      id: '2',
      name: 'Book Two',
      genre: 'Non-Fiction',
      coverUrl: 'http://example.com/book2.jpg',
      averageRating: 3.5,
      haveRead: 80,
      currentlyReading: 30,
      wantToRead: 150,
      userRating: 3
    }
  ]))
}));

describe('BookList', () => {
  test('renders BookList component', async () => {
    render(
      <Router>
        <BookList />
      </Router>
    );

    // Check if loading text is present
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for books to load
    const bookOne = await screen.findByText('Book One');
    const bookTwo = await screen.findByText('Book Two');

    // Check if books are rendered
    expect(bookOne).toBeInTheDocument();
    expect(bookTwo).toBeInTheDocument();
  });

  test('filters books by name', async () => {
    render(
      <Router>
        <BookList />
      </Router>
    );

    // Wait for books to load
    await screen.findByText('Book One');

    // Search for "Book One"
    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'Book One' }
    });

    // Check if only "Book One" is displayed
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.queryByText('Book Two')).not.toBeInTheDocument();
  });

  test('filters books by genre', async () => {
    render(
      <Router>
        <BookList />
      </Router>
    );

    // Wait for books to load
    await screen.findByText('Book One');

    // Search for "Fiction"
    fireEvent.change(screen.getByPlaceholderText(/search by genre/i), {
      target: { value: 'Fiction' }
    });

    // Check if only "Book One" is displayed
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.queryByText('Book Two')).not.toBeInTheDocument();
  });

  test('sorts books by name', async () => {
    render(
      <Router>
        <BookList />
      </Router>
    );

    // Wait for books to load
    await screen.findByText('Book One');

    // Sort by name
    fireEvent.change(screen.getByDisplayValue(/name/i), {
      target: { value: 'name' }
    });

    const books = screen.getAllByRole('heading', { level: 2 });
    expect(books[0]).toHaveTextContent('Book One');
    expect(books[1]).toHaveTextContent('Book Two');
  });
});
