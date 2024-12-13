# **Note App**

## **Prerequisites**

Ensure the following software is installed **(optional if not using Docker)**:

- **Node.js** (>= 14.x)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose**
- **MySQL**
- **Redis**

---

## **Setup Instructions**

### **1. Clone the Repo and Install Dependency**

```bash
git clone https://github.com/your-username/respond-io-note-app.git
cd respond-io-note-app
npm install
```

### **2.1. Software Setup (If Not Using Docker)**

- **Node**: Ensure Node.js and npm are installed.
- **MySQL**: Set up a MySQL database and update the `.env` file with the appropriate credentials.
- **Redis**: Install and start the Redis server.

### **2.1.1. Run Application Locally**

```bash
npm start
```

The app will be available at http://localhost:3000

### **2.2.1 Software Setup (If Using Docker)**

- **Docker**: Ensure Docker Desktop is installed.

### **2.2.2 Run Application through Docker**

Build the app by entering the following command into command:

```bash
docker-compose build
```

After the app has been built, start the app by using:

```bash
docker-compose up
```

The app will be available at http://localhost:3000

## **API Documentation And Testing**

## Swagger

The documentation contains every API path and its functionality with examples.
Access the API documentation at:

```
http://localhost:3000/api-doc
```

## **Design Patterns**

## 1. Singleton (Logger)

- Ensures a single instance of the `Logger` class is used throughout the application.
- Implementation:
  - `src/utils/logger.ts`: Contains the Singleton Logger class.
  - Logs every API requests and when used manually in the application.

## 2. Factory (Note Repository)

- Used to create different types of notes (`PersonalNote`, `WorkNote`) based on the provided type.
- Implementation:
  - `src/notes/note.factory.ts`: Contains the NoteFactory class.
  - `src/notes/note.interface.ts`: Defines the Note interface.
  - `src/notes/personal.note.ts` and `src/notes/work.note.ts`: Implement the Note interface for personal and work notes.
