# Kiss You - Social Media Platform

Kiss You is a social media platform built with the MERN stack, featuring real-time messaging, user interactions, and admin management. It leverages NestJS for the backend and ReactJS with Vite for the frontend, utilizing MongoDB as the database and Socket.io for real-time communication. The backend is containerized using Docker.

## Features

### User Features:
1. **Manage Personal Account**: Register, log in, edit profile, and delete account.
2. **Connect with Friends**: Search users, send friend requests, and manage friend list.
3. **Manage Posts**: Create, edit, delete posts, like, comment, and share.
4. **Direct Messaging**: Real-time messaging with other users using WebSockets.
5. **Notifications**: Receive notifications for friend requests, post interactions, and system alerts.

### Admin Features:
6. **Manage Posts**: Approve or reject posts.
7. **User Management**: Manage and moderate users.
8. **User and Post Statistics**: View insights and data visualizations.

## Feature Details with Images

### **Manage Personal Account**
![image](https://github.com/user-attachments/assets/d6171124-3025-47c2-a2b6-bc57caa97c7e)
![image](https://github.com/user-attachments/assets/d4e8ebed-18da-4282-b295-30e1db13df31)
![image](https://github.com/user-attachments/assets/37d8c14a-1e64-4228-ac62-acbae24e83b7)

### **Connect with Friends**
![image](https://github.com/user-attachments/assets/839f1404-897c-47fe-b43a-83609b623bfb)
![image](https://github.com/user-attachments/assets/73e0627e-7eae-453c-88d4-64df30283b3a)
![image](https://github.com/user-attachments/assets/86a7e969-2e7b-49d9-9a4c-7f256ddbcbd0)

### **Manage Posts**
![image](https://github.com/user-attachments/assets/d5b14a4b-6792-4321-83a5-7ae5af758f84)
![image](https://github.com/user-attachments/assets/4011e439-c5e1-4f0f-8ddd-545ff452ce26)

### **Direct Messaging**
![image](https://github.com/user-attachments/assets/a079859a-77c3-4f54-9f5a-1a3ab81440cb)

### **Notifications**
![image](https://github.com/user-attachments/assets/70a6656a-7111-4026-a48c-3a892ffde06a)

### **Admin - Manage Posts**
![image](https://github.com/user-attachments/assets/377437b1-540f-4e1c-9c24-c4a3301ec105)

### **Admin - User Management**
![image](https://github.com/user-attachments/assets/d02b1428-900d-41b2-9833-1a5ad67d6967)

### **Admin - User and Post Statistics**
![image](https://github.com/user-attachments/assets/a59e3c4d-4931-402c-a01b-178ae6f86d7b)
![image](https://github.com/user-attachments/assets/79c418b1-a5a9-4741-a072-ed9eed149e6d)

## Tech Stack
- **Frontend**: ReactJS + Vite
- **Backend**: NestJS
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Storage**: AWS S3
- **CDN**: AWS CloudFront
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

