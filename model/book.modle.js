
const createBooksTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(6) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    author VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL,
    release_date DATE NOT NULL,
    user VARCHAR(8) NOT NULL,
    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE
  )
`;
module.exports = createBooksTableQuery;


