# Quantica

Quantica is a full-stack web application designed to solve mathematical problems and plot functions. The application consists of a React-based frontend and a Flask-based backend, providing a seamless user experience for solving math problems and visualizing functions.

## ✨ Features

- 🧮 **Math Problem Solver:** Provides step-by-step solutions to various math problems.
- 📈 **Function Plotter:** Allows users to plot mathematical functions interactively.
- 🔒 **User Authentication:** Secure user authentication and session management using MongoDB.
- 📱 **Responsive Design:** Optimized for both desktop and mobile devices.

## 🛠️ Technologies Used

### Frontend

- ⚛️ **React**: A JavaScript library for building user interfaces.
- 🟦 **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- ⚡ **Vite**: A build tool that provides a faster and leaner development experience.
- 🎨 **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- 🧩 **Radix UI**: A set of accessible and customizable UI components.
- 🎥 **Framer Motion**: A library for animations and gestures.
- 🚦 **React Router**: Declarative routing for React applications.

### Backend

- 🐍 **Flask**: A lightweight WSGI web application framework in Python.
- 🍃 **PyMongo**: A Python distribution containing tools for working with MongoDB.
- 🦄 **Gunicorn**: A Python WSGI HTTP Server for UNIX.
- 🌐 **Flask-CORS**: A Flask extension for handling Cross-Origin Resource Sharing (CORS).
- 🔑 **dotenv**: A module to load environment variables from a `.env` file.

## 📦 Installation Guide

### Prerequisites

- **Node.js**: Ensure you have Node.js installed for the frontend.
- **Python**: Ensure you have Python installed for the backend.

### Frontend Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Create a virtual environment:

    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:

    ```bash
    .\venv\Scripts\activate
    ```

4. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Add secrets into `.env` file 

6. Start the Flask server:

    ```bash
    python app.py or flask run
    ```

## 🗂️ Project Structure

```
Quantica/
├── client/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── index.css
│   │   ├── lib/
│   │   ├── main.tsx
│   ├── vite.config.ts
├── LICENSE
├── README.md
├── server/
│   ├── __pycache__/
│   ├── .env
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes.py
│   ├── utils/
│   ├── venv/
```

## 🚀 Usage

### Math Problem Solver

1. Navigate to the math solver section in the application.
2. Enter your math problem in the input field.
3. Click the "Solve" button to get a step-by-step solution.

### Function Plotter

1. Navigate to the function plotter section in the application.
2. Enter the function you want to plot in the input field.
3. Click the "Plot" button to visualize the function.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

