# Notes Management System

This is a full-stack Notes Management application combining a **Spring Boot** backend and an **Angular** frontend into one runnable project.

---

## Notes on Development

This project is currently a demo and will be developed further. Upcoming features planned include:

- Integration of JWT authentication for secure access  
- Improved exception handling for better error management  
- Implementation of a search feature to quickly find notes  

Stay tuned for updates!

## Features

- Create, read, update, and delete notes via REST API  
- Angular single-page application frontend served by Spring Boot  
- Data persistence with JPA and an embedded database (e.g., H2 or your configured DB)  
- Cross-origin resource sharing (CORS) configured for frontend-backend communication  

---

## Getting Started

### Prerequisites

- Java 17+ (or compatible JDK)  
- Maven  
- Node.js and Angular CLI (for frontend development)  

### Running the Application

Since the Angular app is embedded in the Spring Boot project, you only need to run the Spring Boot backend:

```bash
mvn clean install
mvn spring-boot:run

Then open your browser and navigate to:
http://localhost:8080

The Angular frontend will load, communicating with the backend APIs served from the same server.

Development

If you want to work on the frontend separately, go to the Angular project folder(which is located on the master branch) and run:

```bash
ng serve

This starts the Angular development server at http://localhost:4200.

Make sure to configure proxy settings for backend API calls if needed.

---

## Project Structure

- src/main/java - Spring Boot backend source code  
- src/main/resources/static - Angular production build files served as static resources  
- src/main/resources/application.properties - Backend configuration  

---

## Notes

- Angular production build files are located in src/main/resources/static and served by Spring Boot.  
- For production deployment, build Angular and copy the dist files into the backend's static folder before packaging.

---

## Contact

For any questions, feel free to reach out:  
**Letapata Qhobela** — letapataqhobela@gmail.com  
[LinkedIn](https://linkedin.com/in/qhobela-letapata-774192204/) | [GitHub](https://github.com/Letapata23)

---

*Thank you for reviewing my project!*

