import API from './api';

export const bookService = {
  // Get all books
  getBooks: async (params = {}) => {
    const response = await API.get('/books', { params });
    return response.data;
  },

  // Get single book
  getBook: async (bookId) => {
    const response = await API.get(`/books/${bookId}`);
    return response.data;
  },

  // Download book
  downloadBook: async (bookId) => {
    const response = await API.get(`/books/${bookId}/download`, {
      responseType: 'blob'
    });
    return response;
  },

  // Rate book
  rateBook: async (bookId, rating) => {
    const response = await API.post(`/books/${bookId}/rate`, { rating });
    return response.data;
  },

  // Upload book (admin only)
  uploadBook: async (bookData) => {
    const formData = new FormData();
    Object.keys(bookData).forEach(key => {
      formData.append(key, bookData[key]);
    });
    
    const response = await API.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update book (admin only)
  updateBook: async (bookId, bookData) => {
    const response = await API.put(`/books/${bookId}`, bookData);
    return response.data;
  },

  // Delete book (admin only)
  deleteBook: async (bookId) => {
    const response = await API.delete(`/books/${bookId}`);
    return response.data;
  }
};
