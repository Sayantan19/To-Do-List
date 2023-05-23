# MERN To-Do List

A simple To-Do list application built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

- Add new tasks with a title and description
- Mark tasks as completed
- Update task details
- Delete tasks
- View list of tasks

## Technologies Used

- MongoDB: A NoSQL database used for storing task data.
- Express.js: A web application framework for creating the server-side application and handling API endpoints.
- React: A JavaScript library for building the user interface.
- Node.js: A JavaScript runtime environment used for running the server-side application.
- Axios: A promise-based HTTP client for making API requests.
- Bootstrap: A popular CSS framework for styling the application.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or a remote MongoDB connection URL

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/todo-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-list
   ```

3. Install dependencies for both the server and client:

   ```bash
   npm install
   cd client
   npm install
   ```

4. Create a `.env` file in the project root directory and set the following environment variables:

   ```plaintext
   PORT=8000              # Port number for the server
   MONGODB_URI=your-uri   # MongoDB connection URI
   ```

5. Start the server and client:

   ```bash
   npm run dev
   ```

   This command will start the server and the React development server concurrently.

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

- `GET /tasks/viewactivetask`: Get all active tasks
- `GET /tasks/viewactivetask`: Get all inactive tasks
- `POST /tasks/addtask`: Add a new task
- `POST /tasks/updatetask`: Update a task
- `POST /tasks/completetask`: Mark a task as completed
- `DELETE /tasks/deletetask/`: Delete a task

## Folder Structure

- `client/`: Frontend code using React
- `server/`: Backend code using Express.js and MongoDB

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
