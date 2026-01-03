# Product Requirements Document: Debatrium

## 1. Introduction & Vision

**Major Word Debates** is a web-based platform designed to empower users to analyze and understand complex topics by leveraging the power of Artificial Intelligence. Users can upload PDF documents containing text on any subject, and the platform will generate a structured debate or a comprehensive summary based on the content.

The vision is to provide a tool for students, researchers, and intellectually curious individuals to quickly distill arguments, understand multiple perspectives, and deepen their comprehension of written materials.

## 2. Goals & Objectives

*   **Primary Goal:** To provide users with an AI-driven tool to generate debates and summaries from their PDF documents.
*   **User Goal:** Quickly understand the core arguments and counter-arguments within a text without extensive manual reading.
*   **Business Goal:** Create a robust and scalable platform that can handle multiple users and documents, establishing a foundation for future premium features.

## 3. User Personas

*   **The Student (High School/University):** Needs to quickly understand source material for essays, assignments, and exam preparation. Wants to identify key arguments and potential counter-arguments.
*   **The Researcher/Academic:** Analyzes dense academic papers and articles. Uses the tool to get a high-level overview and identify the main lines of reasoning before diving deep.
*   **The Lifelong Learner:** An individual with a curiosity for various topics who wants to efficiently consume and understand content from e-books, reports, and articles.

## 4. Core Features

### 4.1. User Authentication

*   **Sign Up:**
    *   Users can create a new account using a username, email, and password.
    *   Passwords must be securely hashed and stored.
    *   Email verification should be implemented to ensure validity.
*   **Login:**
    *   Registered users can log in using their email/username and password.
    *   The system will use JSON Web Tokens (JWT) for session management.
*   **Logout:**
    *   Users can securely log out, invalidating their session token.
*   **Password Reset:**
    *   Users who have forgotten their password can request a reset link via email.
    *   A unique, time-sensitive token will be sent to their registered email address.

### 4.2. User Profile & Dashboard

*   **User Dashboard:**
    *   Upon logging in, users are directed to a personal dashboard.
    *   The dashboard will display a list of all their uploaded PDF documents.
    *   It will provide an interface to upload new documents.
*   **Profile Management:**
    *   Users can view and update their username.
    *   Users can change their password from their profile page.

### 4.3. PDF Document Management

*   **PDF Upload:**
    *   Authenticated users can upload PDF files via a drag-and-drop interface or a file selector.
    *   Uploads will be processed and stored securely (e.g., on Cloudinary).
    *   The system will extract text content from the uploaded PDF for AI processing.
*   **PDF Listing & Viewing:**
    *   Uploaded PDFs will be displayed as cards on the user's dashboard.
    *   Each card will show the document title and other relevant metadata.
*   **PDF Deletion:**
    *   Users can delete PDFs they no longer need. This will remove the file and its associated data from the system.

### 4.4. AI-Powered Analysis

*   **AI Summary Generation:**
    *   For any uploaded PDF, a user can request an AI-generated summary.
    *   The extracted text is sent to the Gemini AI service.
    *   The resulting summary is displayed on a dedicated page (`/ai-summary`).
*   **AI Debate Generation (Core Feature):**
    *   This feature will take the extracted text and use the AI to formulate a structured debate, presenting key arguments and potential counter-arguments found within the text.
    *   The "Debate Gate" service will manage the logic for prompting the AI to produce a balanced and coherent debate format.

## 5. Technical Requirements

### 5.1. Frontend

*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS with a component library for UI elements (e.g., Shadcn/UI).
*   **State Management:** React Context API for global state like authentication.
*   **Routing:** React Router for client-side navigation.
*   **API Communication:** Axios for making HTTP requests to the backend.

### 5.2. Backend

*   **Framework:** Node.js with Express.js.
*   **Database:** MongoDB with Mongoose for data modeling (Users, PDFs).
*   **Authentication:** JWT (JSON Web Tokens).
*   **File Handling:** Multer for handling multipart/form-data (file uploads).
*   **Asynchronous Operations:** `async/await` with custom handlers for clean code.

### 5.3. Third-Party Services

*   **Cloud Storage:** Cloudinary for storing uploaded PDF documents.
*   **AI Service:** Google Gemini API for summary and debate generation.
*   **Email Service:** Nodemailer for sending transactional emails (password reset, etc.).

### 5.4. Deployment & DevOps

*   **Containerization:** Docker for creating consistent environments for development and production.
*   **Web Server:** Nginx as a reverse proxy in production.
*   **CI/CD:** GitHub Actions for automated testing and deployment workflows.

## 6. Future Scope (V2)

*   **Interactive Debates:** Allow users to "argue" with the AI, asking follow-up questions or challenging points.
*   **RAG-Pipeline** RAG based text generation.
*   **Multi-Document Analysis:** Allow users to select multiple documents and generate a synthesized debate or summary from all of them.
*   **Sharing & Collaboration:** Allow users to share their generated summaries/debates with others via a public link.
*   **Text Input:** Allow users to paste text directly into a text area instead of only uploading PDFs.
*   **Enhanced AI Models:** Integrate more advanced or specialized AI models for different types of analysis (e.g., legal, scientific).
*   **User Analytics:** Provide users with insights into their reading and analysis habits.
