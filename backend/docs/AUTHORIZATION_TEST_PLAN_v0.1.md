# GabayAral — Authorization Test Plan v0.1

**Status:** PROPOSED  
**Reference:** Master Log v4.1

## Authentication Tests

| Test | Expected Result |
|---|---|
| Register with valid details | Account created according to approved registration workflow |
| Register with duplicate email | Registration rejected |
| Login with correct credentials | Authentication succeeds |
| Login with incorrect credentials | Authentication rejected |
| Access protected endpoint without login | Access denied |
| Logout authenticated user | Session invalidated |

## School Membership Tests

| Test | Expected Result |
|---|---|
| User selects an approved school membership | Allowed |
| User selects a school they do not belong to | Denied |
| User selects an inactive membership | Denied |
| User attempts to create a duplicate user-school membership | Rejected |
| User switches between authorized schools | Allowed after validation |

## Role Permission Tests

| Test | Expected Result |
|---|---|
| Student attempts School Administrator action | Denied |
| Teacher accesses assigned subject offering | Allowed |
| Teacher accesses unassigned subject offering | Denied |
| Parent accesses approved linked child's released grades | Allowed |
| Parent accesses unlinked student's grades | Denied |
| Parent attempts to retrieve student submission files | Denied |
| User attempts to assign themselves an administrator role | Denied |

## Cross-School Security Tests

| Test | Expected Result |
|---|---|
| School A user requests School B private records | Denied |
| User changes school ID in request | Backend independently validates access |
| User changes role code in request | No unauthorized privilege granted |
| User accesses a resource outside their authorized assignment | Denied |

## Implementation Notes

- Use Django's test framework.
- Use isolated test data after database models and migrations are approved.
- Test both successful and unauthorized requests.
- Include CSRF tests once the authentication mechanism is finalized.
- Never rely on Frontend role checks for security.

**Current status:** Test cases documented. Full integration tests pending implementation and database approval.
