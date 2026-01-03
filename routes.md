# Application Routes

This document outlines the primary frontend and backend API routes for the **Major Word Debates** application.

## Frontend Routes

The frontend application uses React Router to manage navigation. Routes are divided into public-facing pages and protected routes that require user authentication.

| Path                                | Component         | Protection         | Description                                                 |
| ----------------------------------- | ----------------- | ------------------ | ----------------------------------------------------------- |
| `/`                                 | `Home`            | Public             | The main landing page of the application.                   |
| `/about`                            | `AboutUs`         | Public             | A page describing the project and its purpose.              |
| `/login`                            | `Login`           | Guest-only         | User login page. Only accessible if not logged in.          |
| `/signup`                           | `Signup`          | Guest-only         | User registration page. Only accessible if not logged in.   |
| `/reset-password/:resetPasswordToken` | `ResetPassword`   | Public             | Page to reset password using a token from email.            |
| `/dashboard`                        | `Dashboard`       | Authenticated      | Main user dashboard, shows uploaded PDFs.                   |
| `/dashboard/pdf/:id`                | `AiSummary`       | Authenticated      | Displays the AI-generated summary/debate for a specific PDF.|
| `/dashboard/profile`                | `Profile`         | Authenticated      | User profile page for changing username and password.       |

## Backend API Routes

The backend is a Node.js/Express API. All routes are prefixed with `/api`.

### Auth Routes (`/api/auth`)

| Method | Endpoint                                | Controller            | Protection | Description                                           |
| ------ | --------------------------------------- | --------------------- | ---------- | ----------------------------------------------------- |
| `POST` | `/sign-up`                              | `signup`              | Public     | Registers a new user.                                 |
| `POST` | `/log-in`                               | `login`               | Public     | Authenticates a user and returns a JWT.               |
| `POST` | `/logout`                               | `logout`              | JWT        | Logs the user out by clearing the session cookie.     |
| `GET`  | `/verify-email/:verificationToken`      | `verifyEmail`         | Public     | Verifies a user's email using a token.                |
| `GET`  | `/check-availability`                   | `checkAvailability`   | Public     | Checks if a username is available for registration.   |
| `POST` | `/forgot-password`                      | `forgotPaswordRequest`| Public     | Sends a password reset link to the user's email.      |
| `POST` | `/reset-password/:resetPasswordToken`   | `resetPassword`       | Public     | Resets the user's password using a valid token.       |

### User Routes (`/api/users`)

| Method | Endpoint            | Controller         | Protection | Description                                   |
| ------ | ------------------- | ------------------ | ---------- | --------------------------------------------- |
| `GET`  | `/me`               | `getCurrentUser`   | Optional JWT | Gets the current authenticated user's data.     |
| `POST` | `/update-password`  | `changePassword`   | JWT        | Updates the authenticated user's password.    |
| `POST` | `/update-username`  | `changeUsername`   | JWT        | Updates the authenticated user's username.    |

### PDF Routes (`/api/pdfs`)

| Method  | Endpoint      | Controller        | Protection | Description                                       |
| ------- | ------------- | ----------------- | ---------- | ------------------------------------------------- |
| `GET`   | `/`           | `getMyPdfs`       | JWT        | Retrieves all PDFs belonging to the current user. |
| `GET`   | `/:id`        | `getSinglePdf`    | JWT        | Retrieves a single PDF by its ID.                 |
| `POST`  | `/:id/submit` | `submitPdfToAI`   | JWT        | Submits PDF text to the AI for analysis.          |
| `PATCH` | `/:id/consume`| `markPdfAsConsumed` | JWT        | Marks a PDF as "consumed" by the user.            |

### Upload Routes (`/api/upload`)

| Method   | Endpoint          | Controller            | Protection | Description                                             |
| -------- | ----------------- | --------------------- | ---------- | ------------------------------------------------------- |
| `POST`   | `/pdf`            | `uploadPdfController` | JWT        | Uploads a PDF file and saves its metadata.              |
| `DELETE` | `/pdf/:publicId`  | `deletePdf`           | JWT        | Deletes a PDF from Cloudinary and the database.         |
