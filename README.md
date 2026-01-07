# Charity Frontend

This is the frontend for the Charity project, built with React, TypeScript, and Vite. It provides a user-friendly interface for managing campaigns, volunteers, and donations.

## Features
- **Campaign Management**: Create, update, and manage campaigns with detailed information and assets, including public and private views.
- **Volunteer Applications**: Handle volunteer applications, including submission, review, and approval workflows. Includes filtering and searching capabilities.
- **Finance Tracking**: Track donations, expenses, and funds with detailed reports, visualizations, and reconciliation tools.
- **Responsive Design**: Optimized for both desktop and mobile devices to ensure accessibility for all users.
- **Authentication**: Secure login and registration with JWT-based authentication, including role-based access control.
- **Dashboard**: Admin dashboard for managing users, campaigns, and finances with real-time updates.
- **Notifications**: Real-time notifications for important events like new applications or donations.

## Tech Stack
- **Framework**: React, TypeScript
- **State Management**: Zustand for lightweight and scalable state management.
- **Routing**: React Router for dynamic routing and nested layouts.
- **HTTP Client**: Axios for API communication with error handling.
- **UI Library**: Ant Design for pre-styled components and consistent design.
- **Charts**: Recharts for data visualization.
- **Styling**: TailwindCSS for utility-first styling and rapid development.

## Prerequisites
- **Node.js**: Version 16 or higher
- **Package Manager**: npm or yarn

## Getting Started

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/HuyenDieu13/ChuyenXeBacAi_FE.git
cd ChuyenXeBacAi_FE
```

### 2. Install Dependencies
Install the required dependencies using npm:
```bash
npm install
```
Or, if you prefer yarn:
```bash
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_NAME=CharityFrontend
VITE_ENABLE_LOGS=true
```
- `VITE_API_BASE_URL`: The base URL for the backend API.
- `VITE_APP_NAME`: The name of the application (used in the UI).
- `VITE_ENABLE_LOGS`: Set to `true` to enable debug logs in development.

### 4. Start the Development Server
Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 5. Build for Production
To build the project for production:
```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

### 6. Preview the Production Build
To preview the production build locally:
```bash
npm run preview
```

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Project Structure
- `src/`: Contains the source code.
  - `assets/`: Static assets like images and icons.
  - `components/`: Reusable React components, such as buttons, modals, and tables.
  - `pages/`: Page-level components for different routes, such as login, dashboard, and home.
  - `services/`: API service functions for interacting with the backend, including authentication and data fetching.
  - `store/`: Zustand state management files for global state.
  - `types/`: TypeScript type definitions for the application, ensuring type safety.
  - `hooks/`: Custom React hooks for reusable logic, such as authentication and data fetching.
  - `layouts/`: Layout components for consistent page structure, such as headers and sidebars.
  - `config/`: Configuration files for Axios and API routes.
  - `helpers/`: Utility functions for common tasks, such as date formatting and validation.
  - `contexts/`: React context providers for managing global application state.

## Dependencies
### Main
- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable state-management solution.
- **Axios**: A promise-based HTTP client for making API requests.
- **Ant Design**: A popular UI library for React.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **Recharts**: A charting library for data visualization.

### Development
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool for modern web projects.
- **ESLint**: A tool for identifying and fixing code quality issues.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.

## Common Issues
### 1. API Errors
Ensure the `VITE_API_BASE_URL` in your `.env` file is correct and the backend server is running.

### 2. Port Conflicts
If port `5173` is already in use, specify a different port when starting the development server:
```bash
npm run dev -- --port=3000
```

### 3. Missing Dependencies
If you encounter missing dependency errors, try reinstalling:
```bash
npm install
```

### 4. Debugging Logs
Enable debug logs by setting `VITE_ENABLE_LOGS=true` in your `.env` file.

## License
This project is licensed under the MIT License.
