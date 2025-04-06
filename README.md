# My React App

This is a simple React application that provides user authentication and displays user data. The application consists of three main pages: Login, Registration, and Home. The Home page is accessible only to users who are logged in.

## Project Structure

```
my-react-app
├── public
│   ├── index.html
├── src
│   ├── api
│   │   ├── auth.ts
│   │   └── links.ts
│   ├── components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-react-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and go to `http://localhost:3000`.

## API Endpoints

- **Login**: `POST https://pelicioni-auth-api.onrender.com/api/user/login`
- **Registration**: `POST https://pelicioni-auth-api.onrender.com/api/user/register`
- **Fetch User Data**: `GET https://pelicioni-auth-api.onrender.com/api/links` (requires JWT)

## Features

- User login and registration
- JWT authentication
- Fetch and display user data on the Home page

## Technologies Used

- React
- TypeScript
- Axios
- React Router

## License

This project is licensed under the MIT License.