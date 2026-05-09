import { now } from './helpers'

export const SEED_USERS = [
  { id: 'u1', name: 'Alice Admin',  email: 'alice@demo.com', password: 'demo123', role: 'Admin'  },
  { id: 'u2', name: 'Bob Member',   email: 'bob@demo.com',   password: 'demo123', role: 'Member' },
]

export const SEED_PROJECTS = [
  { id: 'p1', name: 'Website Redesign', description: 'Redesign the company website', ownerId: 'u1', members: ['u1','u2'], createdAt: now() },
  { id: 'p2', name: 'Mobile App',       description: 'Cross-platform mobile app',    ownerId: 'u1', members: ['u1'],       createdAt: now() },
]

export const SEED_TASKS = [
  { id: 't1', projectId: 'p1', title: 'Design mockups',   description: 'Create Figma mockups',       status: 'In Progress', assigneeId: 'u2', dueDate: '2025-04-01', createdAt: now() },
  { id: 't2', projectId: 'p1', title: 'Setup CI/CD',      description: 'Configure GitHub Actions',    status: 'Todo',        assigneeId: 'u1', dueDate: '2026-06-01', createdAt: now() },
  { id: 't3', projectId: 'p2', title: 'Auth flow',        description: 'Implement JWT auth',          status: 'Done',        assigneeId: 'u1', dueDate: '2026-05-15', createdAt: now() },
  { id: 't4', projectId: 'p1', title: 'API integration',  description: 'Connect frontend to REST API', status: 'Todo',       assigneeId: 'u2', dueDate: '2025-03-20', createdAt: now() },
]

export const STATUSES = ['Todo', 'In Progress', 'Done', 'Blocked']
