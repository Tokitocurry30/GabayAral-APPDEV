# GabayAral — Backend Implementation Checklist

**Reference baseline:** Master Log v4.1  
**Current phase:** Authentication and authorization planning

## Phase 1 — Backend Foundation

- [x] Initialize Django project
- [x] Create six Django application modules
- [x] Configure PostgreSQL connection
- [x] Configure local environment variables
- [x] Create temporary global User model
- [ ] Confirm latest Django and PostgreSQL verification outputs

## Phase 2 — Database Design

- [x] Document multi-school identity requirements
- [x] Identify approved Grade Records Option B decision
- [ ] Obtain authoritative SQL DDL
- [ ] Obtain final Physical Data Dictionary
- [ ] Reconcile entity count and schema versions
- [ ] Approve Django model mappings
- [ ] Create and review migrations
- [ ] Apply migrations to development database

## Phase 3 — Authentication

- [x] Draft Authentication API Contract v0.1
- [ ] Approve authentication mechanism
- [ ] Approve endpoint names and payloads
- [ ] Approve registration and verification workflows
- [ ] Implement authentication endpoints
- [ ] Implement secure password recovery
- [ ] Test authentication workflows

## Phase 4 — Authorization

- [x] Draft Role Permission Matrix v0.1
- [ ] Approve permission matrix
- [ ] Implement school membership checks
- [ ] Implement school role checks
- [ ] Implement platform role checks
- [ ] Implement resource-level authorization
- [ ] Test unauthorized and cross-school requests

## Phase 5 — Frontend Integration

- [x] Obtain Frontend ZIP for review
- [ ] Approve API integration contract
- [ ] Connect authentication forms to Django
- [ ] Connect authorized school selector
- [ ] Replace demonstration data with Backend responses
- [ ] Test end-to-end workflows

## Phase 6 — Quality Assurance

- [ ] Unit tests
- [ ] Authentication security tests
- [ ] School isolation tests
- [ ] Permission tests
- [ ] Database integrity tests
- [ ] Integration tests
- [ ] Team review and sign-off

## Current Blockers

1. Authoritative SQL DDL has not been provided.
2. Final Physical Data Dictionary has not been provided.
3. Authentication API Contract requires team approval.
4. Permission matrix requires team approval.

## Next Milestone

Complete documentation review and obtain approval before implementing database models or authentication endpoints.