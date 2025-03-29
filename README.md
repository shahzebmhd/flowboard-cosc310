# Flowboard

A modern project management application built with Next.js, Appwrite, and Tailwind CSS.

## Team

### Developers and Testers
- **Shahzeb Iqbal** [Team Lead]
- **Jessica**
- **Mark**

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Contributing](#contributing)

## Overview

Flowboard is a collaborative project management tool that allows teams to organize their work in workspaces, projects, and tasks. It provides a clean, intuitive interface for managing team workflows and tracking progress.

## Features

- **Authentication**: User registration, login, and session management
- **Workspaces**: Create and manage team workspaces
- **Projects**: Organize work into projects within workspaces
- **Tasks**: Create, assign, and track tasks with different statuses
- **Members**: Manage workspace members with different roles
- **Real-time Updates**: Stay in sync with your team's progress

## Project Structure

### Root Structure

```
flowboard/
├── src/                  # Source code
├── public/              # Static assets
├── certificates/        # SSL certificates for development
├── .next/              # Next.js build output
├── node_modules/       # Dependencies
├── .env.local          # Environment variables
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── postcss.config.mjs  # PostCSS configuration
├── next.config.mjs     # Next.js configuration
├── components.json     # UI components configuration
├── docker-compose.yml  # Docker configuration
└── Dockerfile         # Docker build configuration
```

### Source Code Structure

```
src/
├── app/              # Next.js App Router
│   ├── (auth)/      # Authentication pages
│   ├── (dashboard)/ # Dashboard pages
│   ├── api/         # API routes
│   ├── globals.css  # Global styles
│   └── layout.tsx   # Root layout
├── components/      # Shared UI components
│   ├── ui/         # Basic UI components (buttons, inputs, etc.)
│   └── data-table  # Table components and utilities
├── features/       # Feature modules
│   ├── tasks/     # Task management
│   │   ├── api/   # Task-related API hooks
│   │   ├── components/ # Task-specific components
│   │   ├── hooks/     # Task-related hooks
│   │   ├── server/    # Server-side task logic
│   │   ├── types.ts   # Task type definitions
│   │   └── schemas.ts # Task validation schemas
│   ├── projects/  # Project management
│   └── members/   # Member management
├── hooks/        # Global custom hooks
├── lib/         # Utility functions and configurations
│   ├── utils.ts # Common utility functions
│   └── rpc.ts   # API client setup
└── config.ts    # Global configuration constants
```

### Features Breakdown

#### Authentication (`src/features/auth/`)

- **Components**: Login and registration forms
- **Server**: Authentication API routes
- **Schemas**: Validation schemas for auth forms
- **Constants**: Authentication-related constants

#### Workspaces (`src/features/workspaces/`)

- **Components**: Workspace creation, listing, and management UI
- **Server**: Workspace API routes
- **Types**: Workspace data models
- **Schemas**: Validation schemas for workspace forms
- **API**: Client-side API hooks for workspaces
- **Hooks**: Custom hooks for workspace functionality

#### Projects (`src/features/projects/`)

- **Components**: Project creation, listing, and management UI
- **Server**: Project API routes
- **Types**: Project data models
- **Schemas**: Validation schemas for project forms
- **API**: Client-side API hooks for projects
- **Hooks**: Custom hooks for project functionality

#### Tasks (`src/features/tasks/`)

- **Components**: Task creation, listing, and management UI
- **Server**: Task API routes
- **Types**: Task data models and enums
- **Schemas**: Validation schemas for task forms
- **API**: Client-side API hooks for tasks
- **Hooks**: Custom hooks for task functionality

#### Members (`src/features/members/`)

- **Components**: Member management UI
- **Server**: Member API routes
- **Types**: Member roles and data models
- **Utils**: Utility functions for member operations

### Components Breakdown

#### UI Components (`src/components/ui/`)

Basic UI components built with Tailwind CSS and Radix UI:

- **Button**: Button component with variants
- **Card**: Card container component
- **Dialog**: Modal dialog component
- **Dropdown**: Dropdown menu component
- **Form**: Form components with validation
- **Input**: Text input component
- **Select**: Select dropdown component
- **Tabs**: Tabbed interface component
- **Avatar**: User avatar component
- **Badge**: Status badge component
- **Calendar**: Date picker calendar
- **Checkbox**: Checkbox input component
- **And more...**

#### Higher-level Components (`src/components/`)

- **Navbar**: Application navigation bar
- **Sidebar**: Application sidebar navigation
- **Projects**: Project listing component
- **Workspace-Switcher**: Component to switch between workspaces
- **Date-Picker**: Date selection component
- **Mobile-Sidebar**: Mobile-responsive sidebar
- **Query-Provider**: React Query provider setup

### API Routes

The application uses Hono.js for API routes:

- **/api/auth**: Authentication endpoints
- **/api/workspaces**: Workspace management
- **/api/projects**: Project management
- **/api/tasks**: Task management
- **/api/members**: Member management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   npm run dev
   ```
   
For HTTPS development:
```bash
npx next dev --experimental-https
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT="your_appwrite_endpoint"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="your_project_id"
APPWRITE_API_KEY="your_api_key"

# Database Configuration
DATABASE_ID="your_database_id"
TASKS_ID="your_tasks_collection_id"
MEMBERS_ID="your_members_collection_id"
PROJECTS_ID="your_projects_collection_id"

# Optional: Development SSL Certificates (for HTTPS)
SSL_CERT_PATH="./certificates/localhost.pem"
SSL_KEY_PATH="./certificates/localhost-key.pem"
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
NEXT_PUBLIC_APPWRITE_TASKS_ID=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=
```

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
2. Make your changes
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request

## License

[MIT License](LICENSE)
