# Todo App

A full-stack Todo application that allows users to register, log in, and manage their personal todo lists. The project features a React frontend and an ASP.NET Core backend, providing secure authentication and persistent storage for todos.

## Installation Instructions

### Prerequisites
- Node.js and npm (for the frontend)
- .NET 9.0 SDK (for the backend)

### Setup Steps
1. Clone the repository to your local machine.
2. Navigate to the `client` folder and run `npm install` to install frontend dependencies.
3. Navigate to the `server/todo_app` folder and run `dotnet restore` to install backend dependencies.

## How to Run the Project

### Start the Backend
1. Open a terminal and navigate to `server/todo_app`.
2. Run `dotnet run` to start the ASP.NET Core backend server.

### Start the Frontend
1. Open a new terminal and navigate to `client`.
2. Run `npm start` to launch the React frontend.

The application will be accessible at `http://localhost:3000` by default.

### Accessing the App on Your Mobile Device

To use the app on your mobile device while developing locally:

1. Ensure your computer and mobile device are connected to the same Wi-Fi network.
2. In the terminal, navigate to the `client` folder and run:
   ```
   npm start -- --host 0.0.0.0
   ```
3. The terminal will display a local network URL, such as `http://192.168.x.x:3000`.
4. On your mobile device, open a browser and enter the local network URL shown in the terminal.
5. The app should now be accessible from your mobile browser.

**Note:** If you do not see a network URL, check your firewall settings and ensure your device is on the same network as your computer.

## Features

### Key Features

1. **User Registration & Login:**
   - Secure authentication using JWT tokens.
   - Users can create an account, log in, and log out securely.
2. **Add, Edit, and Delete Tasks:**
   - Users can add new todo items, edit existing ones, and delete tasks they no longer need.
3. **Mark Tasks as Completed:**
   - Easily mark tasks as done with a single click.
4. **View Task Details:**
   - Click on a task to view more information or edit its details.
5. **Responsive Design:**
   - The UI adapts to both desktop and mobile screens for a seamless experience.
6. **Data Persistence:**
   - All tasks are stored in a backend database, ensuring your data is safe and accessible from any device after login.

## Usage

### How to Use

1. **Register or Log In:**
   - Open the app in your browser.
   - Click on "Register" to create a new account, or "Login" if you already have one.
2. **Add New Tasks:**
   - Use the input form at the top of the Todo List to add a new task.
   - Press Enter or click the add button to save the task.
3. **Mark Tasks as Completed:**
   - Click the checkbox next to a task to mark it as completed. Completed tasks may appear with a strikethrough or different style.
4. **Edit or Delete Tasks:**
   - Click on a task to view or edit its details.
   - Use the delete button to remove tasks you no longer need.
5. **Mobile Usage:**
   - Access the app from your mobile browser using the local network URL as described above.
6. **Data Persistence:**
   - All changes are saved to the backend, so your tasks are available whenever you log in.

#### (Optional) Screenshots or GIFs
You can add screenshots or GIFs here to demonstrate the app’s features and user interface.

## Technologies Used

### Main Tech Stack

- **Frontend:** React (JavaScript), Context API for state management, CSS for styling
- **Backend:** ASP.NET Core (C#), Entity Framework Core (ORM)
- **Database:** SQL Server
- **Authentication:** JWT (JSON Web Tokens)

#### Additional Libraries/Tools
- Axios (API requests)
- React Router (routing)
- Visual Studio/VS Code (development)

## How GitHub Copilot Was Used

GitHub Copilot was used to:
- Auto-generate boilerplate code for React components and ASP.NET controllers.
- Suggest function implementations and improve code efficiency.
- Speed up repetitive tasks such as form handling and API integration.
- Provide useful suggestions for naming conventions and logic structures.
- Help with error handling and best practices in both frontend and backend code.

## Project Structure

### Folder Structure

```
todo_Santhosh/
├── client/               # React frontend
│   ├── public/           # Static files (index.html, icons, etc.)
│   └── src/              # Source code (components, context, styles)
│       ├── components/   # React components (Login, Register, TodoList, etc.)
│       ├── api.js        # API calls
│       ├── AuthContext.js# Authentication context
│       └── ...
├── server/
│   └── todo_app/         # ASP.NET Core backend
│       ├── Controllers/  # API controllers (Auth, Todos)
│       ├── Models/       # Data models (TodoItem, etc.)
│       ├── Migrations/   # Entity Framework migrations
│       ├── Program.cs    # Entry point
│       └── ...
├── README.md
└── ...
```
