const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(8) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL
  )
`;
module.exports = createTableQuery;