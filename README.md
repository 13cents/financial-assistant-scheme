# Financial Assistance Scheme Management System

This project is a backend solution for managing financial assistance schemes for needy individuals and families. The system allows administrators to manage applicants, schemes, and applications, and determine the eligibility of applicants for various financial assistance schemes.

## Project Overview

The objective of this project is to provide a backend system that:
- Manages financial assistance schemes.
- Stores and updates applicant records.
- Advises administrators on which schemes an applicant is eligible for.
- Saves the outcome of applications.
- Manages administrator accounts. (Did not attempt administrator related implementations)
   - If time permits:
      - Would use a library to generate JWT token (eg. passport-jwt)
      - Authenticate with middleware for every API request received
      - Decode and verify user base on JWT token

##Technology Stack
1. SQLite: Light weight relational database management system
2. Swagger: API documentation tool

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/financial-assistance-scheme.git
   cd financial-assistance-scheme
   npm install
   npm run start

2. **To view the DB file (test-db.db)**
   1. Download GUI from https://sqlitebrowser.org/dl/
   2. Open test-db.db with GUI to see table structure


3. **To test with Swagger**
   1. Start up application
   2. Go to http://localhost:3000/api-docs/