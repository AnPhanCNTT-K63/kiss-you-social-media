# Kiss You - Social Media Platform

Kiss You is a social media platform built with the MERN stack, featuring real-time messaging, user interactions, and admin management. It leverages NestJS for the backend and ReactJS with Vite for the frontend, utilizing MongoDB as the database and Socket.io for real-time communication. The backend is containerized using Docker.

## Features

### User Features:
- **Manage Personal Account**: Register, log in, edit profile, and delete account.
- **Connect with Friends**: Search users, send friend requests, and manage friend list.
- **Manage Posts**: Create, edit, delete posts, like, comment, and share.
- **Direct Messaging**: Real-time messaging with other users using WebSockets.
- **Notifications**: Receive notifications for friend requests, post interactions, and system alerts.

### Admin Features:
- **Manage Posts**: Approve or reject posts.
- **User and Post Statistics**: View insights and data visualizations.
- **User Management**: Manage and moderate users.

## Tech Stack
- **Frontend**: ReactJS + Vite
- **Backend**: NestJS
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Containerization**: Docker (Backend only)

## Project Structure
The project has two branches:
- **`api`**: Backend (NestJS, MongoDB, WebSockets, Docker)
- **`client`**: Frontend (ReactJS, Vite, Redux/Context for state management)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- Docker (for backend)

### Clone the Repository
```sh
 git clone https://github.com/yourusername/kiss-you.git
 cd kiss-you
```

### Run Backend with Docker
```sh
cd api
docker-compose up --build
```
This command will build and start the backend service.

### Manual Setup
#### Backend (NestJS API)
```sh
cd api
npm install
npm run start:dev
```
#### Frontend (ReactJS Client)
```sh
cd client
npm install
npm run dev
```

## Contributing
Contributions are welcome! Please create a pull request with detailed changes.

## License
MIT License

## Contact
For any inquiries, feel free to reach out at phanducan147@gmail.com.

