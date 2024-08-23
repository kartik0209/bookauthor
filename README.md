## Technologies Used

- **MongoDB**: A NoSQL database used to store user data, job listings, and resumes.
- **Express.js**: A web application framework for Node.js that handles routing and server-side logic.
- **React.js**: A front-end library for building dynamic user interfaces.
- **Node.js**: A JavaScript runtime used to build the server-side application.

## Setup

### Prerequisites
- Node.js and npm installed.
- MongoDB server running.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kartik0209/bookauthor.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd bookauthor
   ```

3. **Install Dependencies**

   For the server:
   ```bash
   cd server
   npm install
   ```

   For the client:
   ```bash
   cd client
   npm install
   ```

4. **Setup Environment Variables**

   Create a `.env` file in the `server` directory and add the following variables:

   ```env
   DATABASE=your_mongodb_database
   ```

   Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB URI and JWT secret.

5. **Start the Application**

   Start the server:
   ```bash
   cd server
   npm start
   ```

   Start the client:
   ```bash
   cd client
   npm start
   ```

   The server will be running on `http://localhost:5000` and the client on `http://localhost:3000`.


