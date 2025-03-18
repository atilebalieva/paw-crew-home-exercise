## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)

---

## Installation

### **Prerequisites**

Ensure you have the following installed:

- **[Node.js (v16.0 or higher)](https://nodejs.org/)**
- **[Git](https://git-scm.com/)**

### **Setup Instructions**

1️⃣ **Clone the repository**

```sh
git clone https://github.com/your-username/dogs-project.git
cd dogs-project
```
```sh
npm install
# OR
yarn install
```
```sh
npm run dev
# OR
yarn dev
```
## 4. Access the application

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Features

### Browse & Favorite
- Paginated gallery of adoptable dogs
- Filtering by breed, age, and name
- Save favorites to your personal collection
- Find a matched dog
- Find dogs by ZIP code, city, or state

---

## Technology Stack

### Frontend Framework
- React 19 - Component-based UI library
- TypeScript - Static type checking
- Vite - Fast build tool and development server

### State Management & Data Fetching
- React Query - Server state management and caching
- Zustand - Lightweight state management
- Axios - HTTP client for API requests

### Routing & Forms
- React Router v6 - Client-side routing
- React Hook Form - Form state management
- Zod - Form validation

### UI/UX
- Tailwind CSS - Utility-first CSS framework
- Shadcn UI - Accessible component library
- Framer Motion - Animation library

---

## API Integration

The application integrates with the Dogs API to fetch and manage dog data:

- **Search Endpoint**: Retrieves dogs based on filters and pagination
- **Dog Details**: Fetches detailed information for individual dogs
- **Location Services**: Converts locations to searchable geographic coordinates
- **Authentication**: Manages user sessions and favorite lists
```
