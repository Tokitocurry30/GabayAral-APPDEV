# GabayAral — Authentication Validation Rules v0.1

**Status:** Proposed — Pending Team Approval  
**Reference:** Authentication API Contract v0.1

## 1. Registration Validation

The Backend must validate all registration requests independently of Frontend validation.

Proposed rules:

- Full name must be provided.
- Email must have a valid format.
- Email uniqueness must be enforced according to the approved user model.
- Password and confirmation must match.
- Password must satisfy the team's approved password policy.
- Terms must be accepted.
- Account pathway must be a supported registration option.
- Privileged roles must never be self-assigned through registration.
- Conditional invitation and school fields must be validated according to the selected registration pathway.

The minimum password length and account approval workflow remain undecided.

## 2. Login Validation

- Email and password are required.
- Invalid credentials must be rejected.
- Account status must be checked before granting access.
- Authentication must not automatically grant school access.
- Error responses must not reveal sensitive account details.

## 3. School Selection Validation

- User must be authenticated.
- School must exist.
- User must have an active membership in the selected school.
- Requested role must be approved and active.
- School and role selection must not grant additional privileges.

## 4. Password Recovery

- Recovery requests must not disclose whether an email exists.
- Reset tokens must be validated and expire.
- Used or invalid reset tokens must be rejected.
- Password changes must follow the approved password policy.

## 5. Email Verification

- Verification tokens must be validated.
- Expired or invalid tokens must be rejected.
- Verification status must be recorded according to the approved schema.
- Verification must not automatically approve privileged roles.

## 6. Security Requirements

- Use Django's secure password hashing.
- Apply CSRF protection when using session authentication.
- Do not expose passwords, password hashes, or private tokens.
- Enforce authorization on the Backend for every protected operation.
- Reject unauthorized cross-school access.

## 7. Pending Decisions

- Final password policy
- Authentication mechanism
- Registration pathways
- Account status values
- Email verification workflow
- Final API response format
- Physical database schema

No validation rules in this document are claimed as implemented.