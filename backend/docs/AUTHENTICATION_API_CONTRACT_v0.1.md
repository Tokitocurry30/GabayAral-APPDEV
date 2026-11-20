# GabayAral — Authentication API Contract v0.1

**Status:** PROPOSED — For Team Review  
**Backend:** Python / Django  
**Frontend:** HTML, CSS, JavaScript  
**Database:** PostgreSQL  
**Reference baseline:** Master Log v4.1

## 1. Purpose

Define how the GabayAral Frontend will communicate with the Django Backend for authentication, account registration, school selection, and role-based access.

This document describes proposed API behavior only. It does not confirm that the endpoints are implemented or tested.

## 2. Proposed API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register/` | Register a global user account |
| POST | `/api/auth/login/` | Authenticate an existing user |
| POST | `/api/auth/logout/` | End the authenticated session |
| GET | `/api/auth/me/` | Retrieve the authenticated user |
| POST | `/api/auth/forgot-password/` | Request password recovery |
| POST | `/api/auth/reset-password/` | Set a new password using a valid reset token |
| POST | `/api/auth/verify-email/` | Verify an email using a valid token |
| POST | `/api/auth/resend-verification/` | Request another verification email |
| GET | `/api/auth/schools/` | List authorized school contexts |
| POST | `/api/auth/select-school/` | Select an authorized school and role context |

All paths and payloads are proposals pending Frontend/Backend agreement.

## 3. Login

**POST `/api/auth/login/`**

Request:

```json
{
  "email": "student@example.com",
  "password": "example-password",
  "remember_me": false
}
```

Proposed successful response:

```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "full_name": "Sample Student",
    "email": "student@example.com",
    "account_status": "active"
  },
  "requires_school_selection": true
}
```

Authentication does not automatically grant access to a school.

## 4. Registration

**POST `/api/auth/register/`**

The Frontend currently collects:

- `full_name`
- `email`
- `account_pathway`
- `teacher_invitation`
- `school_name`
- `school_email`
- `password`
- `confirm_password`
- `accept_terms`

Proposed example request:

```json
{
  "full_name": "Sample Student",
  "email": "student@example.com",
  "account_pathway": "student",
  "password": "example-password",
  "confirm_password": "example-password",
  "accept_terms": true
}
```

Conditional registration fields must be reviewed for each account pathway.

Registration must not automatically grant School Administrator, Teacher, Platform Administrator, or Platform Developer privileges.

## 5. School and Role Selection

**GET `/api/auth/schools/`**

Returns only school memberships and roles that the authenticated user is authorized to access.

**POST `/api/auth/select-school/`**

Proposed request:

```json
{
  "school_id": "school-id",
  "role_code": "STUDENT"
}
```

The Backend must independently validate:

1. The authenticated user.
2. The selected school.
3. The user's active membership in that school.
4. The approved and active role assignment.
5. Resource-level authorization on subsequent protected requests.

A Frontend-selected role must never be treated as proof of authorization.

## 6. Security Requirements

- Passwords must be securely hashed by Django.
- Protected operations must enforce server-side permissions.
- School membership and role assignments must be independently approved.
- Users must not access another school's records by modifying request parameters.
- Password-reset and email-verification tokens must be validated and expire.
- Authentication errors must avoid exposing sensitive account information.
- Session, CSRF, and token-handling strategy requires team approval.
- API responses must not expose password hashes, private tokens, or unnecessary personal information.

## 7. Database Mapping

Authentication-related logical entities include:

- `USERS`
- `SCHOOLS`
- `SCHOOL_MEMBERSHIPS`
- `SCHOOL_ROLE_ASSIGNMENTS`
- `PLATFORM_ROLE_ASSIGNMENTS`

The final Django model fields, relationships, constraints, and table mappings remain pending approval of the physical database schema.

## 8. Pending Decisions

- Authentication mechanism: Django session-based authentication or another approved strategy.
- Final endpoint paths and response structure.
- Email-verification and password-recovery workflow.
- Registration pathways and approval requirements.
- Password validation policy.
- Account-status transitions.
- School-selection persistence and role-switching behavior.
- Final PostgreSQL DDL and Physical Data Dictionary.

## 9. Implementation Status

| Component | Status |
|---|---|
| Django project foundation | Previously initialized |
| PostgreSQL connection | Previously configured; latest check results not attached |
| Custom User model | Temporary scaffold |
| Authentication API | Not implemented |
| School membership authorization | Not implemented |
| Frontend integration | Not implemented |
| API tests | Not executed |

**Next action:** Review this contract with the Frontend developer and Project Lead before implementation.