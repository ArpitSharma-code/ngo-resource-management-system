# NGO Resource Management System

A full-stack web application built to help non-governmental organizations manage resources, volunteers, donations, and community projects from a single dashboard.

This project is designed to be a strong academic and portfolio submission. It focuses on solving a real NGO operations problem by replacing scattered manual records with a centralized digital system.

## Overview

NGOs often handle multiple operational activities at the same time, such as tracking relief materials, assigning volunteers, recording donations, and monitoring ongoing projects. When this information is stored manually in notebooks or spreadsheets, it becomes difficult to maintain accuracy, transparency, and speed.

The NGO Resource Management System addresses that problem by providing:

- A dashboard for operational visibility
- A resource inventory management module
- A volunteer information management module
- A donation tracking module
- A project monitoring module

## Problem Statement

Many NGOs struggle with:

- Manual tracking of essential resources
- Poor visibility into volunteer availability and assignments
- Disorganized donation records
- Difficulty monitoring project progress and beneficiary impact
- Lack of a centralized system for operational management

This project provides a simple and practical software solution to improve organization and decision-making.

## Features

- Dashboard displaying key NGO statistics
- Resource tracking with category, quantity, location, and stock status
- Volunteer management with contact details, skills, availability, and project assignment
- Donation management for money and supplies
- Project management with lead, status, start date, and beneficiaries
- Responsive user interface for desktop and mobile screens
- REST-style backend API
- Local JSON-based data persistence for easy setup and demo use

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js |
| Data Storage | JSON file |
| Architecture | Client-Server |

## System Modules

### 1. Resource Management

Stores and manages NGO inventory such as food, medical kits, educational supplies, and other relief materials.

### 2. Volunteer Management

Maintains volunteer records including contact information, skills, availability, and assigned project.

### 3. Donation Management

Tracks donations received by the NGO, including financial contributions and material support.

### 4. Project Management

Monitors NGO projects with project lead, status, start date, and beneficiary count.

### 5. Dashboard and Reporting

Displays summary information such as total resources, total volunteers, number of projects, and total monetary donations.

## Project Structure

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

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ngo-resource-management-system.git
cd ngo-resource-management-system
```

### 2. Start the project

```bash
npm start
```

### 3. Open in browser

```text
http://localhost:3000
```

## How It Works

- The frontend sends requests to the backend API
- The backend processes resource, volunteer, donation, and project data
- Data is stored in a local JSON file
- The dashboard fetches and displays updated information dynamically

## API Endpoints

### Summary

- `GET /api/summary`

### Resources

- `GET /api/resources`
- `POST /api/resources`

### Volunteers

- `GET /api/volunteers`
- `POST /api/volunteers`

### Donations

- `GET /api/donations`
- `POST /api/donations`

### Projects

- `GET /api/projects`
- `POST /api/projects`

## Screenshots

Add screenshots here after uploading your project to make the repository look more professional.

Suggested screenshots:

- Dashboard homepage
- Resource management section
- Volunteer management section
- Donation management section
- Project management section

## Use Case

This system can be used by:

- NGOs and non-profit organizations
- College students building socially relevant software projects
- Developers creating portfolio-ready full-stack applications
- Institutions looking for a basic NGO management prototype

## Advantages of the Project

- Reduces manual data handling
- Improves record organization
- Makes resource tracking easier
- Supports better volunteer coordination
- Increases transparency in donations and project progress
- Can be extended into a larger production system later

## Future Enhancements

- User authentication and role-based login
- Edit and delete functionality
- Search and filter features
- Charts and analytics dashboard
- Database integration with MongoDB or MySQL
- Export reports in PDF or Excel format
- Cloud deployment using Render, Railway, or Vercel

## GitHub Upload Steps

If you already created the project locally, use:

```bash
git init
git add .
git commit -m "Initial commit - NGO Resource Management System"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ngo-resource-management-system.git
git push -u origin main
```

## Suggested Repository Description

Full-stack NGO Resource Management System for managing resources, volunteers, donations, and community projects through a centralized dashboard.

## Suggested Presentation Explanation

This project is a full-stack NGO Resource Management System developed to improve operational efficiency in non-governmental organizations. It helps manage inventory, volunteer records, donations, and project details in one place. The frontend is built using HTML, CSS, and JavaScript, while the backend is built with Node.js. The system uses JSON-based local storage, making it simple to run, demonstrate, and extend in the future.

## Author

**Arpit Sharma**

If you use this project for your portfolio or college presentation, you can also add your GitHub profile link here after uploading.

## License

This project is licensed under the MIT License.
