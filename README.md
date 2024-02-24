# Project Description
UpSkill is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS. UpSkill aims to provide:
- A seamless and interactive learning experience for students, making education more accessible and engaging.
- A platform for instructors to showcase their expertise and connect with learners across the globe. In the following sections, we will cover the technical details of the platform, including:
  - System architecture: The high-level overview of the platform's components and diagrams of the architecture.
  - Front-end: The description of the front-end architecture, user interface design, features, and functionalities of the front-end, and frameworks, libraries, and tools used.
  - Back-end: The description of the back-end architecture, features and functionalities of the back-end, frameworks, libraries, tools used, and data models and database schema.
  - API Design: The description of the API design, list of API endpoints, their functionalities, and sample API requests and responses.
  - Deployment: The description of the deployment process, hosting environment and infrastructure, and deployment scripts and configuration.
  - Testing: The description of the testing process, types of testing, test frameworks and tools used.
  - Future Enhancements: The list of potential future enhancements to the platform, explanation of how these enhancements would improve the platform, estimated timeline and priority for implementing these enhancements.

# BackEnd
Description of the Back-end Architecture: UpSkill uses a monolithic architecture, with the backend built using Node.js and Express.js, and MongoDB as the primary database.

Features and Functionalities of the Back-end: The back end of UpSkill provides a range of features and functionalities, including:
- User authentication and authorization: Students and instructors can sign up and log in to the platform using their email addresses and password. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- Course management: Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- Payment Integration: Students will purchase and enrol on courses by completing the checkout flow that is followed by Razorpay integration for payment handling.
- Cloud-based media management: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- Markdown formatting: Course content in document format is stored in Markdown format, which allows for easier display and rendering on the front end.

Frameworks, Libraries, and Tools used: The back end of StudyNotion uses a range of frameworks, libraries, and tools to ensure its functionality and performance, including:

- Node.js: Node.js is used as the primary framework for the back end.
- MongoDB: MongoDB is used as the primary database, providing a flexible and scalable data storage solution.
- Express.js: Express.js is used as a web application framework, providing a range of features and tools for building web applications.
- JWT: JWT (JSON Web Tokens) are used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- Bcrypt: Bcrypt is used for password hashing, adding an extra layer of security to user data.
- Mongoose: Mongoose is used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript

# API Design

The UpSkill platform's API is designed following the REST architectural style. The API is implemented using Node.js and Express.js. It uses JSON for data exchange and follows standard HTTP request methods such as GET, POST, PUT, and DELETE. Sample list of API endpoints and their functionalities:

1. /api/auth/signup (POST) - Create a new user (student or instructor) account.
2. /api/auth/login (POST) – Log in using existing credentials and generate a JWT token.
3. /api/auth/verify-otp (POST) - Verify the OTP sent to the user's registered email.
4. /api/auth/forgot-password (POST) - Send an email with a password reset link to the registered email.
5. /api/courses (GET) - Get a list of all available courses.
6. /api/courses/:id (GET) - Get details of a specific course by ID.
7. /api/courses (POST) - Create a new course.
8. /api/courses/:id (PUT) - Update an existing course by ID.
9. /api/courses/:id (DELETE) - Delete a course by ID.
10. /api/courses/:id/rate (POST) - Add a rating (out of 5) to a course. Sample API requests and responses:
11. GET /api/courses: Get all courses
  - Response: A list of all courses in the database
12. GET /api/courses/:id: Get a single course by ID
  - Response: The course with the specified ID
13. POST /api/courses: Create a new course
  - Request: The course details in the request body
  - Response: The newly created course
14. PUT /api/courses/:id: Update an existing course by ID
  - Request: The updated course details in the request body
  - Response: The updated course
15. DELETE /api/courses/:id: Delete a course by ID
  - Response: A success message indicating that the course has been deleted.

Note -> FrontEnd comming Soon...
  
