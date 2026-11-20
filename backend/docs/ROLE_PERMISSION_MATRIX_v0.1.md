# GabayAral — Role Permission Matrix v0.1

**Status:** PROPOSED — For Team Review  
**Reference:** Master Log v4.1  
**Backend:** Django  
**Database:** PostgreSQL

## 1. Purpose

Define how GabayAral authorizes its six user roles while supporting multiple schools under one global account.

The Backend must enforce permissions independently of the Frontend.

## 2. User Roles

GabayAral has six roles:

1. School Administrator
2. Teacher
3. Student
4. Parent/Guardian
5. Platform Administrator
6. Platform Developer

Senior Platform Administrator is an authority level, not a seventh role.

## 3. Permission Matrix

| Feature | School Admin | Teacher | Student | Parent | Platform Admin | Developer |
|---|---|---|---|---|---|---|
| Manage school workspace | Yes, own school | No | No | No | Limited governance | No |
| Manage grade spaces and sections | Yes, own school | No | No | No | No | No |
| Manage subject offerings | Yes, own school | No | No | No | No | No |
| Assign Teachers | Yes, own school | No | No | No | No | No |
| Publish announcements | Authorized scope | Assigned scope | No | No | No | No |
| Create activities and quizzes | No | Assigned offerings | No | No | No | No |
| Submit activities | No | No | Own enrollment | No | No | No |
| Review submissions | No | Assigned offerings | No | No | No | No |
| Record and release grades | No | Assigned offerings | No | No | No | No |
| View released grades | No | Authorized scope | Own records | Approved linked child | No routine access | No routine access |
| Acknowledge announcements | No | No | No | Approved linked child | No | No |
| Verify guardian requests | Referred cases | Authorized scope | No | No | No | No |
| Manage platform operations | No | No | No | No | Authorized scope | Technical scope |
| Approve developer access | No | No | No | No | Authorized authority | No |
| Deploy software updates | No | No | No | No | Approve when required | Authorized deployment |

"Yes" always means the action is allowed only within the user's approved scope and subject to resource-level checks.

## 4. Multi-School Identity Rules

- A global user account can belong to multiple schools.
- Each user-school pair has one permanent membership record.
- School role assignments are separate from school memberships.
- One user may hold multiple approved roles within a school.
- Platform roles are separate from school roles.
- Selecting a school or role in the Frontend does not grant permission.
- An inactive membership must not grant school access.
- An inactive or unapproved role assignment must not grant privileges.
- Historical membership and role records must be preserved.

## 5. Required Authorization Checks

For every protected school operation, Django must validate:

1. The user is authenticated.
2. The user account is permitted to operate.
3. The selected school is valid.
4. The user has an active membership in that school.
5. The user has the required approved and active role assignment.
6. The requested resource belongs to the authorized school.
7. The user is authorized for the exact resource or relationship.

For Teacher actions, authorization must be checked against the exact assigned subject offering.

For Student actions, authorization must be checked against the exact student enrollment.

For Parent/Guardian actions, authorization must be checked against the approved guardian-student link and permitted resource visibility.

## 6. Privilege Restrictions

Users must not:

- Assign themselves privileged roles.
- Change a request's school ID to access another school's records.
- Use another student's enrollment.
- Access an unapproved guardian connection.
- Access unreleased grades or feedback.
- Retrieve private submission files through unauthorized endpoints.
- Perform administrative actions outside their assigned school.

## 7. Implementation Status

This matrix defines proposed authorization behavior.

No permission middleware, decorators, endpoint authorization rules, or database constraints are claimed as implemented or tested.

**Next action:** Obtain team approval and reconcile with the final physical schema before implementation.