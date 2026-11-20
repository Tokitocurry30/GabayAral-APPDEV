# GabayAral — Identity Database Specification

Status: DRAFT — Pending physical data dictionary verification

## 1. Global User

Purpose:
Represents one person across the GabayAral platform.

Django model:
accounts.User

Required verification:
- Primary key type
- Exact table name
- Email uniqueness
- Name fields
- Password storage
- Account status
- Email verification fields
- Timestamp fields

## 2. School

Purpose:
Represents an individual school within GabayAral.

Proposed Django location:
schools.models.School

Required verification:
- Primary key type
- Exact table name
- School name and identifiers
- School status
- Registration and approval fields
- Timestamp fields

## 3. School Membership

Purpose:
Connects a global user to a school.

Proposed Django location:
schools.models.SchoolMembership

Confirmed architectural constraint:
UNIQUE(user_id, school_id)

Required verification:
- Primary key type
- Foreign key names
- Membership status
- School role relationships
- Membership lifecycle fields
- Timestamp fields

## 4. Roles and Permissions

Purpose:
Separates platform-level access from school-level access.

Required verification:
- Approved role tables
- Role assignment relationships
- Permission scope
- School administrator approval process
- Teacher invitation process

## Implementation Rules

- Do not assign school privileges based only on signup selection.
- Do not grant guardian access from a code alone.
- Do not allow cross-school data access.
- Do not create migrations until the physical schema is confirmed.
