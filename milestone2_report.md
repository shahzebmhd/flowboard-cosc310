# Flowboard - Milestone 2 Report

## Table of Contents
1. [Requirements Completion](#requirements-completion)
   - [Completed Requirements](#completed-requirements-60)
   - [In Progress Requirements](#in-progress-requirements)
   - [Planned Requirements](#planned-requirements)
   - [Non-Functional Requirements Met](#non-functional-requirements-met)
2. [Repository Management](#repository-management)
3. [Code Organization](#code-organization)
4. [Design and Architecture](#design-and-architectural-patterns)
   - [SOLID Principles](#solid-principles-implementation)
   - [Design Patterns](#design-patterns)
   - [Feature-Sliced Architecture](#architectural-pattern-feature-sliced-architecture)
   - [Coupling and Cohesion](#coupling-and-cohesion-analysis)
5. [Testing Results](#testing-results)
6. [Known Issues and Fixes](#known-issues-and-planned-fixes)
7. [Conclusion](#conclusion)

## Requirements Completion

Based on our initial requirements from Assignment 1, we have successfully implemented more than 60% of the functional requirements. Here's what we've completed:

### Completed Requirements (>60%)

#### User Authentication and Authorization
- Secure login and logout for users via email-based authentication
- Basic authorization checks for workspace access

#### Workspace Management
- Users can create and manage workspaces
- Workspace switching functionality to handle multiple workplaces efficiently
- Basic member management functionality (viewing members)

#### Task Management
- Users can perform CRUD operations on tasks
- Tasks contain details such as title, description, status, and project association
- Data table view for tasks

#### Data Filters and Search
- Basic filtering by status and other task properties (implementation in progress)

### In Progress Requirements

1. Kanban board testing and full implementation
2. Fixing bug with task creation (identified and replicated)
3. Customization of the platform via design choice and Live messaging
4. Analytical features for tasks and projects
5. Data Filters improvements and fixing miscellaneous lint errors
6. Role-based access control (ADMIN and MEMBER roles defined but not fully implemented)

### Planned Requirements

- Live messaging
- Complete role-based access control implementation
- Customization of the visual UI 

### Non-Functional Requirements Met

- Security: Secure authentication and HTTPS communication
- Documentation: API documentation and comprehensive README
- Usability: Responsive web app UI compatible with mobile and desktop

## Repository Management 

We have implemented a structured branching strategy using the `FB-XXXX` naming convention for feature branches. This workflow:

- Ensures consistent branch naming
- Facilitates tracking of features and issues
- Improves collaboration among team members
- Maintains a clean and organized repository history

Our commit message format also follows the `FB-XXXX: Description of changes` pattern, which helps with traceability and organization.

## Code Organization

Our codebase follows a modular and feature-focused organization that promotes maintainability and scalability:

### Directory Structure
```
src/
├── app/                # Next.js app router pages and layouts
│   ├── (auth)/         # Authentication-related pages
│   ├── (dashboard)/    # Main application dashboard pages
│   └── (standalone)/   # Standalone pages
├── components/         # Shared components used across features
│   └── ui/             # Base UI components library
├── features/           # Feature modules
│   ├── auth/           # Authentication functionality
│   ├── members/        # Member management and roles
│   ├── projects/       # Project management
│   ├── tasks/          # Task management
│   └── workspaces/     # Workspace management
└── lib/                # Utility libraries and shared code
```

### Feature Module Structure
Each feature module is organized consistently with the following structure:
```
features/<feature>/
├── api/                # API hooks for data fetching and mutation
├── components/         # Feature-specific UI components
├── hooks/              # Custom React hooks for feature logic
├── server/             # Server-side API route handlers
├── schemas.ts          # Data validation schemas
└── types.ts            # TypeScript type definitions
```

This structure helps developers quickly find code for a specific feature and understand how different parts of the application work together.

## Design and Architectural Patterns

Our application uses several design and architectural patterns that make our code easier to maintain and update.

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
- **What it means:** Each component has only one job to do.
- **Example:** Our codebase separates responsibilities into different files:
  - `src/features/tasks/components/task-actions.tsx` only handles UI actions for tasks
  - `src/features/tasks/api/use-create-tasks.ts` only handles creating tasks
  - `src/features/tasks/schemas.ts` only handles validating task data

#### Open/Closed Principle (OCP)
- **What it means:** Code should be open for extension but closed for modification.
- **Example:** Our UI components can be extended without changing their core code:
  ```typescript
  // src/components/ui/button.tsx
  const buttonVariants = cva(
    "inline-flex items-center justify-center...",
    {
      variants: {
        variant: {
          primary: "bg-gradient-to-b from-blue-600...",
          destructive: "bg-gradient-to-b from-amber-600...",
          // New variants can be added here without changing the Button component
        },
        // ...
      }
    }
  )
  ```

#### Liskov Substitution Principle (LSP)
- **What it means:** Child classes should be able to replace parent classes without breaking the code.
- **Example:** All our API hooks follow the same pattern and can be used interchangeably:
  ```typescript
  // All mutation hooks return the same interface
  const { mutate, isPending } = useCreateTask();
  const { mutate, isPending } = useUpdateTask();
  const { mutate, isPending } = useDeleteTask();
  ```

#### Interface Segregation Principle (ISP)
- **What it means:** Interfaces should be specific to the needs of the client.
- **Example:** We use specific interfaces for different operations:
  ```typescript
  // src/features/tasks/types.ts
  export interface TaskCreateInput {
    title: string;
    description?: string;
    status: string;
    projectId: string;
  }
  
  export interface TaskUpdateInput {
    id: string;
    title?: string;
    description?: string;
    status?: string;
  }
  ```

#### Dependency Inversion Principle (DIP)
- **What it means:** High-level modules should not depend on low-level modules. Both should depend on abstractions.
- **Example:** Components use hooks as abstractions instead of directly calling APIs:
  ```typescript
  // Component doesn't know the implementation details
  export const TaskActions = () => {
    const { mutate } = useDeleteTask();
    
    const onDelete = () => {
      mutate({ taskId: id });
    }
  };
  ```

### Design Patterns

#### Repository Pattern
**What it does:** Separates the logic for accessing data from the rest of the application.

**Benefits:**
- Keeps data access code in one place
- Makes it easier to test
- Reduces code duplication

**Example Code:**
```typescript
// File: src/features/tasks/api/use-create-tasks.ts
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            // Handle data access logic
            const response = await client.api.tasks["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Task created");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            toast.error("Failed to create task");
        },
    });
    
    return mutation;
};
```

**Where to find it:** All files in `src/features/*/api/*.ts` implement this pattern, such as:
- `src/features/tasks/api/use-create-tasks.ts`
- `src/features/tasks/api/use-update-tasks.ts`
- `src/features/projects/api/use-create-project.ts`

#### Component Composition Pattern
**What it does:** Builds complex UI components by combining smaller, reusable components.

**Benefits:**
- Promotes reuse of UI components
- Keeps the UI consistent
- Makes components easier to test

**Example Code:**
```typescript
// File: src/features/tasks/components/task-actions.tsx
export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
    const { mutate, isPending } = useDeleteTask();
    
    const onDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this task?")
        if (!confirmDelete) return;
        
        mutate({ taskId: id });
    }
    
    return (
        <div className="flex justify-end">
            <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onDelete} disabled={isPending}>
                        <TrashIcon className="size-4 mr-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
```

**Where to find it:** Complex components that compose multiple smaller UI components:
- `src/features/tasks/components/task-actions.tsx`
- `src/features/tasks/components/data-kanban.tsx`
- `src/components/workspace-switcher.tsx`

#### Facade Pattern
**What it does:** Provides a simple interface to a complex system.

**Benefits:**
- Makes it easier to use complex subsystems
- Reduces dependencies between code
- Improves readability

**Example Code:**
```typescript
// File: src/features/workspaces/api/use-create-workspace.ts
export const useCreateWorkspace = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            // Complex backend interaction hidden behind a simple interface
            const response = await client.api.workspaces["$post"]({ json });
            return await response.json();
        },
        onSuccess: (data) => {
            // Complex cache management and routing hidden from the consumer
            toast.success("Workspace created");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            router.push(`/workspaces/${data.id}`);
        },
        onError: () => {
            toast.error("Failed to create workspace");
        },
    });

    return mutation;
};
```

**Where to find it:** API hook files that simplify complex backend interactions:
- `src/features/workspaces/api/use-create-workspace.ts`
- `src/features/projects/api/use-get-projects.ts`
- `src/features/auth/api/use-login.ts`

#### Observer Pattern
**What it does:** Allows objects to subscribe to changes in other objects.

**Benefits:**
- Enables loose coupling between components
- Facilitates real-time updates across the application
- Supports a reactive programming model

**Example Code:**
```typescript
// File: src/features/tasks/api/use-create-tasks.ts
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            // Implementation details...
        },
        onSuccess: () => {
            // Notify all observers (components using tasks data) that data has changed
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
    
    return mutation;
};

// File: src/features/tasks/components/data-table.tsx
export const DataTable = () => {
    // This component observes the tasks data and re-renders when it changes
    const { data, isLoading } = useGetTasks();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <table>
            {/* Render task data */}
        </table>
    );
};
```

**Where to find it:** Observable data patterns with React Query:
- `src/features/tasks/api/use-create-tasks.ts` (subject)
- `src/features/tasks/components/data-table.tsx` (observer)
- `src/features/tasks/components/data-kanban.tsx` (observer)

### Architectural Pattern: Feature-Sliced Architecture

**What it does:** Organizes code by feature rather than by technical role.

**Benefits:**
- Makes it easier to find and understand code
- Allows team members to work on different features simultaneously
- Makes the codebase more maintainable

**Implementation:** Each feature has its own directory containing all related code, from UI to API calls.

### Coupling and Cohesion Analysis

Our codebase follows these important principles:

**High Cohesion:**
- Each module has a clear purpose
- Related functionality is grouped together
- Components have specific responsibilities

**Low Coupling:**
- Features communicate through well-defined interfaces
- Dependencies between modules are kept to a minimum
- Components interact through props and context

This approach helps us avoid common problems like having classes that do too much or code that's disorganized and hard to maintain.

## Testing Results

Our test suite covers all major API endpoints and functionality:

- **Total Time:** 20.89 seconds
- **Authentication API Tests:** 9 total, 9 passed
- **Projects API Tests:** 8 total, 8 passed
- **Workspaces API Tests:** 8 total, 8 passed
- **Tasks API Tests:** 8 total, 8 passed
- **Members API Tests:** 3 total, 3 passed

All initial tests are passing for the implemented features, but we've identified several areas that need improvement:

1. **Task Creation Bug**: Issues with creating tasks
2. **Kanban Board Implementation**: Drag-and-drop functionality needs work
3. **Data Filters**: Some filters don't work correctly when combined
4. **Calendar Picker UI**: Broken due to version conflicts

The test files can be found in the `__tests__` directory, with each file focusing on a specific feature.

## Known Issues and Planned Fixes

1. **Task Creation Bug**: 
   - Issue: The task creation form has problems with fields like assignees and due dates.
   - Fix: We're improving the task creation form and API.

2. **Kanban Board Implementation**:
   - Issue: The drag-and-drop functionality needs improvement.
   - Fix: We're enhancing the Kanban board to handle task status changes better.

3. **Data Filters**:
   - Issue: Some filters don't work correctly when combined.
   - Fix: We're improving the filter implementation.

4. **Member Management**:
   - Issue: Member management is limited to viewing members.
   - Fix: We're adding features to add, remove, and update member roles.

5. **Role-Based Access Control**:
   - Issue: Role types are defined but not fully implemented.
   - Fix: We're implementing proper role-based access control across the application.

6. **Lint Errors**:
   - Issue: There are miscellaneous lint errors in the codebase.
   - Fix: We're fixing these errors to improve code quality.

7. **Different Package Managers**:
   - Issue: Team members use different package managers, causing dependency issues.
   - Fix: We're standardizing on NPM as our single package manager.

## Conclusion

We have successfully met the requirements for Milestone 2 by:

1. Implementing more than 60% of the functional requirements
2. Creating a Docker image for easy deployment and testing
3. Implementing workflow automation through CI and repository management
4. Applying design and architectural patterns to improve code quality
5. Conducting comprehensive testing to ensure functionality

Our next steps will focus on:

1. Fixing the identified bugs and issues
2. Completing the in-progress features, particularly role-based access control
3. Implementing the remaining planned features
4. Enhancing the user experience
5. Preparing for the final submission 