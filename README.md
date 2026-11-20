# GabayAral

**GabayAral: An AI-Assisted Class Communication and Activity Management System with Multilingual Accessibility and Parent Acknowledgment**

GabayAral is a school communication and activity-management web application being developed for teachers, students, parents/guardians, and school administrators. Planned capabilities include announcements, activities and deadlines, parent acknowledgment, accessible text presentation, read-aloud support, and AI-assisted language features.

> **Project status:** In development. This repository contains work in progress; not every planned feature is connected to the database or usable end-to-end. See **Current implementation status** below.

## Technology

- **Backend:** Python, Django
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript
- **Development environment:** Windows / VS Code (other operating systems may work with adjusted commands)

## Prerequisites

Install the following on the computer that will run the project:

1. Python (use a version compatible with the project's Django dependencies)
2. PostgreSQL
3. Git
4. A web browser

## Clone the repository

```powershell
git clone https://github.com/Tokitocurry30/GabayAral-APPDEV.git
cd GabayAral-APPDEV
```

**Branch note:** Backend development is currently maintained on `backend/school-admin-development`. If the submitted work is not merged into the default branch, switch to it:

```powershell
git switch backend/school-admin-development
```

## Run the Django backend locally (Windows PowerShell)

From the repository root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

> **Maintainer action required:** Confirm that `backend/requirements.txt` exists and includes the tested dependencies before submission. If missing, generate and review a dependency file from the working virtual environment; do not commit `.venv`.

### Configure PostgreSQL and environment variables

1. Start PostgreSQL.
2. Create a local development database named `gabayaral_db`, unless the project's Django settings specify a different name.
3. Inspect `backend/config/settings.py` to identify the actual database configuration and required environment variables.
4. Supply your own **local** database username/password and any required Django settings. Never commit real passwords or `.env` files.

> **Maintainer action required:** Add a safe `.env.example` documenting the *actual* required variable names, and ensure the Django settings load those variables. Do not assume that a `.env` file is read automatically.

### Database initialization

The project uses a custom `accounts.User` model and a separately approved physical database design. **Do not blindly run `makemigrations` or `migrate` against a new database until the team confirms whether the approved SQL scripts or Django migrations are authoritative.**

> **Maintainer action required before a professor can reproduce the full system:** Include the approved, non-sensitive schema/migration files and their exact execution order here, or provide a verified Django migration workflow. If seed/demo accounts are necessary, document a safe way to create them without publishing credentials.

### Start the development server

Once the database has been initialized correctly:

```powershell
python manage.py check
python manage.py runserver
```

Open: **http://127.0.0.1:8000/**

If the backend health endpoint is included in the submitted branch, it can be checked at **http://127.0.0.1:8000/api/health/**.

> The home URL may not serve the frontend unless the frontend has been integrated with Django. A working health endpoint does not mean all application features are implemented.

## Open the frontend

The frontend source archive supplied during development contains `GabayAral-Frontend/index.html` and HTML/CSS/JavaScript assets. **The final repository location and frontend launch process must be verified before submission.**

If the frontend is committed as a standalone static directory, open its `index.html` with a local development server (for example VS Code Live Server). Do not assume it is served at port 8000 or that its login and dashboard pages are connected to the backend.

> **Maintainer action required:** Replace this paragraph with the actual checked-in frontend path, launch command, URL, and integration status.

## Current implementation status

| Component | Status |
| --- | --- |
| Django project and API URL structure | Developed |
| School Admin dashboard API route | Scaffolded; returns 401 for anonymous users and 403 pending school authorization |
| School Admin invitation API route | Scaffolded; does **not** send invitations or create users |
| School Admin permission checks | Fail-closed pending database-backed school memberships |
| Session login, logout, and current-user endpoints | Under development; verify which endpoints are committed to the submitted branch |
| PostgreSQL schema and school memberships | Pending approved schema integration |
| End-to-end frontend/backend integration | Not yet verified |
| AI assistance, translation, and read-aloud | Planned; implementation status to be confirmed |

## Running tests

From `backend/` with the virtual environment active:

```powershell
python manage.py check
python manage.py test tests.test_school_admin_dashboard tests.test_school_user_invitation_api --verbosity 2
```

Additional test modules may exist. Tests that depend on the database require a correctly initialized test database. Some design/contract tests intentionally describe features that are not yet implemented.

## Security and submission notes

- Do not commit `.env`, `.venv`, API keys, PostgreSQL passwords, or real student information.
- A private GitHub repository requires inviting the instructor as a collaborator; GitHub private repositories are not accessible to everyone with the link.
- The instructor needs the correct **branch** and all necessary non-sensitive setup files to reproduce the project.
- This README must be updated after the final frontend location, database setup, and dependency file are verified.

## Contributors

GabayAral development team — add the team members and their roles here.
