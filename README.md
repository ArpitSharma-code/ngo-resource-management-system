# NGO Resource Management System

A full-stack web application designed for NGOs to manage resources, volunteers, donations, and project records from one dashboard.

## Project Overview

This project can be presented as a college or portfolio project that solves a real-world NGO operations problem:

- Manual tracking of relief materials and essential items
- Difficulty in monitoring volunteer allocation
- Scattered donation records
- Limited visibility into project progress and beneficiary reach

The system provides a single dashboard to organize this information and improve transparency.

## Features

- Dashboard with key NGO metrics
- Resource inventory tracking
- Volunteer management
- Donation record management
- Project tracking with beneficiaries and status
- Responsive frontend UI
- Backend API with local JSON-based persistence

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Storage: JSON file database

## Folder Structure

```text
ngo-resource-management-system/
├── backend/
│   ├── data/
│   │   └── db.json
│   └── server.js
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
└── README.md
```

## How To Run The Project

1. Open terminal in the project folder:

```bash
cd "/Users/arpitsharma/Documents/Ai projects/ngo-resource-management-system"
```

2. Start the server:

```bash
npm start
```

3. Open this in your browser:

```text
http://localhost:3000
```

## API Endpoints

- `GET /api/summary`
- `GET /api/resources`
- `POST /api/resources`
- `GET /api/volunteers`
- `POST /api/volunteers`
- `GET /api/donations`
- `POST /api/donations`
- `GET /api/projects`
- `POST /api/projects`

## How To Upload On GitHub

1. Open terminal in the project folder:

```bash
cd "/Users/arpitsharma/Documents/Ai projects/ngo-resource-management-system"
```

2. Initialize Git:

```bash
git init
```

3. Add all project files:

```bash
git add .
```

4. Create your first commit:

```bash
git commit -m "Initial commit - NGO Resource Management System"
```

5. Create a new empty repository on GitHub named `ngo-resource-management-system`.

6. Connect local project to GitHub:

```bash
git remote add origin https://github.com/YOUR-USERNAME/ngo-resource-management-system.git
```

7. Rename branch to `main`:

```bash
git branch -M main
```

8. Push the project:

```bash
git push -u origin main
```

## Suggested GitHub Description

`A full-stack NGO Resource Management System for tracking resources, volunteers, donations, and community projects.`

## Suggested Viva / Presentation Explanation

You can explain the project like this:

> NGO Resource Management System is a full-stack web application developed to help non-governmental organizations manage operational data in one place. The system tracks resource inventory, volunteer details, donations, and project information through a user-friendly dashboard. The frontend is built with HTML, CSS, and JavaScript, while the backend is built using Node.js with REST-style APIs and local JSON storage.

## Future Improvements

- Add authentication for admin users
- Add edit and delete functionality
- Connect to MongoDB or MySQL
- Add charts and analytics
- Deploy online using Render or Railway
