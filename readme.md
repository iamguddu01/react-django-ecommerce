# React + Django E‑commerce Project

## Overview
A starter e‑commerce application:
- Django REST API for products, carts, orders, users, and admin.
- React SPA frontend for browsing, cart/checkout, authentication, and order history.

## Key features
- JWT / token authentication
- Product listing & detail
- Shopping cart
- Order creation & history
- Admin site for product management
- CORS ready for local dev

## Tech stack
- Backend: Python, Django, Django REST Framework
- Frontend: JavaScript/TypeScript, React, Create React App (or Vite)
- DB: Postgres

## Prerequisites
- macOS/Linux/Windows
- Python 3.8+
- Node 14+
- npm or yarn
- Git

## Repository layout
- backend/        — Django project
- backend/app/    — Django apps (products, orders, users, ...)
- frontend/       — React application
- README.md

## Local development

Backend (Django)
1. Create & activate virtualenv
    ```
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    ```
2. Install Python dependencies
    ```
    pip install -r requirements.txt
    ```
3. Environment variables (.env)
    - DJANGO_SECRET_KEY=your_secret_key
    - DEBUG=True
    - ALLOWED_HOSTS=localhost,127.0.0.1
    - DATABASE_URL=sqlite:///db.sqlite3 (or your Postgres URL)
4. Migrate and create superuser
    ```
    python manage.py migrate
    python manage.py createsuperuser
    ```
5. Run server
    ```
    python manage.py runserver
    ```
    API base: http://127.0.0.1:8000/api/

Frontend (React)
1. Install node modules
    ```
    cd frontend
    npm install
    ```
    or
    ```
    yarn
    ```
2. Environment variables (frontend/.env)
    - REACT_APP_API_URL=http://127.0.0.1:8000/api
3. Run dev server
    ```
    npm start
    ```
    App: http://localhost:3000

Notes
- If using CRA, set "proxy" in package.json to the backend API URL or use REACT_APP_API_URL for fetch calls.
- Ensure Django CORS settings allow the frontend origin (e.g., http://localhost:3000).

## Contact / Troubleshooting
- For local issues: check console logs for frontend and Django runserver output.
- Common fixes:
  - CORS errors: add origin to CORS_ALLOWED_ORIGINS
  - 500 errors: check Django logs for missing env vars or migrations

