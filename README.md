# Kiss You - Social Media Platform

Kiss You is a social media platform built with the MERN stack, featuring real-time messaging, user interactions, and admin management. It leverages NestJS for the backend and ReactJS with Vite for the frontend, utilizing MongoDB as the database and Socket.io for real-time communication. The backend is containerized using Docker.

## Features

![image](https://github.com/user-attachments/assets/1aa381c3-a392-4d10-a7e8-605032813927)

### User Features:
- **Manage Personal Account**: Register, log in, edit profile, and delete account.

  ![image](https://github.com/user-attachments/assets/d6171124-3025-47c2-a2b6-bc57caa97c7e) ![image](https://github.com/user-attachments/assets/d4e8ebed-18da-4282-b295-30e1db13df31) ![image](https://github.com/user-attachments/assets/37d8c14a-1e64-4228-ac62-acbae24e83b7) ![image](https://github.com/user-attachments/assets/3c7435b9-ffb9-44f4-9d03-06e3d1b8972a) ![image](https://github.com/user-attachments/assets/88a24bcc-4423-4446-833f-c4d5c67e700a) ![image](https://github.com/user-attachments/assets/fc504e77-b534-466a-8dfc-a3361f9694c5) ![image](https://github.com/user-attachments/assets/5c0857e6-67e3-4abe-8c1f-8d89c610f8b9) ![image](https://github.com/user-attachments/assets/be0e547e-4195-4a7c-a43c-a7f4eba3c25f) ![image](https://github.com/user-attachments/assets/cbcf57a0-6361-441d-92ba-055e2ee135df)

- **Connect with Friends**: Search users, send friend requests, and manage friend list.

![image](https://github.com/user-attachments/assets/839f1404-897c-47fe-b43a-83609b623bfb) ![image](https://github.com/user-attachments/assets/73e0627e-7eae-453c-88d4-64df30283b3a) ![image](https://github.com/user-attachments/assets/86a7e969-2e7b-49d9-9a4c-7f256ddbcbd0)

- **Manage Posts**: Create, edit, delete posts, like, comment, and share.

 ![image](https://github.com/user-attachments/assets/d5b14a4b-6792-4321-83a5-7ae5af758f84) ![image](https://github.com/user-attachments/assets/4011e439-c5e1-4f0f-8ddd-545ff452ce26) ![image](https://github.com/user-attachments/assets/a9ffc8ba-3d3d-4aa2-bf00-a3d907b39b13) ![image](https://github.com/user-attachments/assets/8dfda7e4-b58b-4de4-bf00-272267f470a6)

- **Direct Messaging**: Real-time messaging with other users using WebSockets.

![image](https://github.com/user-attachments/assets/a079859a-77c3-4f54-9f5a-1a3ab81440cb) 

- **Notifications**: Receive notifications for friend requests, post interactions, and system alerts.

![image](https://github.com/user-attachments/assets/70a6656a-7111-4026-a48c-3a892ffde06a)

### Admin Features:
- **Manage Posts**: Approve or reject posts.

![image](https://github.com/user-attachments/assets/377437b1-540f-4e1c-9c24-c4a3301ec105)

- **User Management**: Manage and moderate users.

![image](https://github.com/user-attachments/assets/d02b1428-900d-41b2-9833-1a5ad67d6967)

- **User and Post Statistics**: View insights and data visualizations.

![image](https://github.com/user-attachments/assets/a59e3c4d-4931-402c-a01b-178ae6f86d7b) ![image](https://github.com/user-attachments/assets/79c418b1-a5a9-4741-a072-ed9eed149e6d) ![image](https://github.com/user-attachments/assets/14979724-bd99-4ebe-8873-4193900b04fd)

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

