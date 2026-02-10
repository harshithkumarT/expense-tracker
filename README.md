# Expense Tracker

A full-stack Expense Tracker application built with the PERN stack (PostgreSQL, Express, React, Node.js). This application helps users track their daily expenses, categorize them, and manage their budget effectively.

## Features

- **User Authentication**: Secure Login and Registration system using JWT.
- **Dashboard**: View a list of all your expenses.
- **Add Expense**: Easily add new expenses with title, amount, category, and notes.
- **Delete Expense**: Remove expenses you no longer need to track.
- **Categorization**: Organize expenses by category for better insights.
- **Responsive Design**: Dashboard optimized for various screen sizes using Tailwind CSS.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast project tooling and bundling.
- **Tailwind CSS**: For styling and responsive design.
- **Axios**: For making HTTP requests to the backend.
- **React Router DOM**: For handling client-side routing.

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: Relational database for storing users and expenses.
- **pg**: PostgreSQL client for Node.js.
- **jsonwebtoken (JWT)**: For secure user authentication.
- **bcryptjs**: For password hashing.
- **cors**: For handling Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- PostgreSQL installed and running.

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/expense-tracker.git
    cd expense-tracker
    ```

2.  **Backend Setup**

    - Navigate to the server directory:
      ```bash
      cd server
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `server` directory and add your database and JWT config:
      ```env
      PORT=3000
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_HOST=localhost
      DB_PORT=5432
      DB_NAME=Expense-Tracker
      JWT_SECRET=your_super_secret_key
      ```
    - Set up your Database Schema (using the provided `schema.sql` or SQL commands).
    - Start the server:
      ```bash
      npm start
      # or 
      nodemon server.js
      ```

3.  **Frontend Setup**

    - Navigate to the client directory:
      ```bash
      cd ../client
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```

4.  **Usage**
    - Open your browser and go to `http://localhost:5173`.
    - Register a new account.
    - Login and start tracking your expenses!

## API Endpoints

### Auth
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login requesting a JWT token.

### Expenses
- `GET /api/expenses`: Get all expenses for the logged-in user.
- `POST /api/expenses`: Add a new expense.
- `PUT /api/expenses/:id`: Update an existing expense.
- `DELETE /api/expenses/:id`: Delete an expense.

## License

This project is licensed under the MIT License.
