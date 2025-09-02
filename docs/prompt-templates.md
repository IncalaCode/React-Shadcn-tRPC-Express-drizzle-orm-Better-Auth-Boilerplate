# 📝 Prompt Templates for AI Development

Ready-to-use prompts for working with AI assistants on this React + tRPC + Express + Drizzle ORM + Better Auth boilerplate.

## 🎯 **How to Use These Templates**

1. **Copy** the prompt template
2. **Customize** the placeholders (text in `[brackets]`)
3. **Paste** into your AI assistant
4. **Review** and **iterate** on the response

## 🚀 **Feature Development Prompts**

### **1. Add New Database Entity**

```markdown
I need to add a new [EntityName] entity to my React + tRPC + Drizzle ORM + Better Auth boilerplate.

Requirements:
- [List the fields and their types]
- [Describe relationships with other entities]
- [Specify validation rules]
- [Include any special behaviors]

Please create:
1. Drizzle ORM schema with proper decorators
2. Update the database connection to include this entity
3. Add the entity to shared types
4. Follow the exact pattern from the existing User entity

Entity fields:
[Field 1]: [Type] - [Description]
[Field 2]: [Type] - [Description]
[Field 3]: [Type] - [Description]
```

**Example:**
```markdown
I need to add a new BlogPost entity to my React + tRPC + Drizzle ORM + Better Auth boilerplate.

Requirements:
- Blog posts have title, content, author, publish date, and status
- Posts belong to a user (author)
- Posts can be published or draft
- Title and content are required
- Content can be long text

Please create:
1. Drizzle ORM schema with proper decorators
2. Update the database connection to include this entity
3. Add the entity to shared types
4. Follow the exact pattern from the existing User entity

Entity fields:
title: string - Post title (required, max 255 chars)
content: text - Post content (required)
authorId: string - User ID who created the post
status: enum - Published or Draft
publishedAt: date - When the post was published
```

### **2. Create tRPC Controllers and Procedures**

```markdown
I need to create tRPC controllers and procedures for [EntityName] CRUD operations.

Requirements:
- [List the operations needed: create, read, update, delete, list, search]
- [Specify authentication requirements for each operation]
- [Describe any special business logic]
- [Include pagination if needed]

Please create:
1. Individual controller functions in controllers/[entity]/ folders
2. Main controller file that imports all functions
3. Input validation schemas using Zod
4. tRPC router that uses the controller
5. Proper error handling and validation
6. Follow the exact structure from the existing auth/user controllers

Operations needed:
- [Operation 1]: [Description] - [Auth level required]
- [Operation 2]: [Description] - [Auth level required]
- [Operation 3]: [Description] - [Auth level required]

Controller structure:
- controllers/[entity]/[operation]/[operation].ts
- controllers/[entity]/[entity].controller.ts
- trpc/routers/[entity].ts
```

**Example:**
```markdown
I need to create tRPC controllers and procedures for BlogPost CRUD operations.

Requirements:
- Users can create, read, update, delete their own posts
- Public users can read published posts
- Admins can manage all posts
- Include pagination for listing posts
- Search functionality for public posts

Please create:
1. Individual controller functions in controllers/blogPost/ folders
2. Main controller file that imports all functions
3. Input validation schemas using Zod
4. tRPC router that uses the controller
5. Proper error handling and validation
6. Follow the exact structure from the existing auth/user controllers

Operations needed:
- create: Create new blog post - Authenticated users only
- list: List published posts with pagination - Public access
- get: Get single post by ID - Public access for published, author access for drafts
- update: Update post - Author or admin only
- delete: Delete post - Author or admin only
- search: Search published posts - Public access

Controller structure:
- controllers/blogPost/create/create.ts
- controllers/blogPost/list/list.ts
- controllers/blogPost/get/get.ts
- controllers/blogPost/update/update.ts
- controllers/blogPost/delete/delete.ts
- controllers/blogPost/search/search.ts
- controllers/blogPost/blogPost.controller.ts
- trpc/routers/blogPost.ts
```

### **3. Build React Components with React Query**

```markdown
I need to create React components for [FeatureName] that use React Query for data management.

Requirements:
- [Describe the UI components needed]
- [Specify the data they should display/edit]
- [Include any user interactions]
- [Describe the styling approach]
- [Specify if using tRPC or direct API calls]

Please create:
1. Main component with proper TypeScript interfaces
2. React Query hooks for data fetching and mutations
3. Form components if needed (using react-hook-form)
4. List/display components if needed
5. Follow the existing component patterns
6. Use Tailwind CSS for styling
7. Include proper error handling and loading states
8. Ensure React Query DevTools compatibility

Components needed:
- [Component 1]: [Purpose] - [Props and behavior]
- [Component 2]: [Purpose] - [Props and behavior]
- [Component 3]: [Purpose] - [Props and behavior]

Data management:
- [Query 1]: [Purpose] - [Data source]
- [Mutation 1]: [Purpose] - [Data source]
- [Mutation 2]: [Purpose] - [Data source]
```

**Example:**
```markdown
I need to create React components for BlogPost management that use React Query.

Requirements:
- Users can create and edit blog posts
- Display list of user's posts with edit/delete options
- Form for creating/editing posts
- Preview of published posts
- Use React Query for data management

Please create:
1. Main component with proper TypeScript interfaces
2. React Query hooks for data fetching and mutations
3. Form components if needed (using react-hook-form)
4. List/display components if needed
5. Follow the existing component patterns
6. Use Tailwind CSS for styling
7. Include proper error handling and loading states
8. Ensure React Query DevTools compatibility

Components needed:
- BlogPostForm: Create/edit form with title, content, and status fields
- BlogPostList: Display user's posts with pagination and actions
- BlogPostCard: Individual post display with edit/delete buttons
- BlogPostPreview: Preview of post content before publishing

Data management:
- useBlogPosts: Query to fetch user's blog posts
- useCreatePost: Mutation to create new blog post
- useUpdatePost: Mutation to update existing blog post
- useDeletePost: Mutation to delete blog post
```

### **4. Configure Better Auth Feature**

```markdown
I need to configure Better Auth for [FeatureName].

Requirements:
- [Describe the authentication feature needed]
- [Specify user roles and permissions]
- [Include any special authentication flows]
- [Describe integration with existing auth]

Please help me:
1. Update Better Auth configuration in auth/config.ts
2. Modify database entities if needed
3. Update frontend authentication flow
4. Test the authentication integration
5. Follow existing Better Auth patterns

Feature details:
- [Feature description]
- [User roles involved]
- [Authentication requirements]
```

**Example:**
```markdown
I need to configure Better Auth for OAuth Google login.

Requirements:
- Users can sign in with Google accounts
- Existing email/password auth should still work
- New users should be created automatically
- Users should be able to link multiple accounts

Please help me:
1. Update Better Auth configuration in auth/config.ts
2. Modify database entities if needed
3. Update frontend authentication flow
4. Test the authentication integration
5. Follow existing Better Auth patterns

Feature details:
- Google OAuth integration
- User roles: user, admin
- Authentication requirements: OAuth token validation
```

## 🔧 **Debugging & Problem Solving Prompts**

### **5. Debug TypeScript Errors**

```markdown
I'm getting TypeScript errors in my React + tRPC + Drizzle ORM + Better Auth boilerplate:

Error: [Paste the exact error message]
File: [File path where error occurs]
Line: [Line number]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]

Here's the relevant code:
[Paste the problematic code]

Please help me:
1. Understand what's causing this error
2. Suggest a fix
3. Explain why this solution works
4. Show me the corrected code
```

### **6. Fix Runtime Errors**

```markdown
I'm experiencing a runtime error in my React + tRPC + Drizzle ORM + Better Auth app:

Error: [Paste the error message]
Stack trace: [Paste the stack trace if available]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]
- The error occurs in [frontend/backend/both]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me:
1. Identify the root cause
2. Suggest debugging steps
3. Provide a working solution
4. Explain how to prevent this in the future
```

### **7. Better Auth Issues**

```markdown
I'm having issues with Better Auth in my React + tRPC + TypeORM app:

Problem: [Describe the authentication issue]
Error: [Paste any error messages]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- My Better Auth configuration: [describe your setup]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me:
1. Identify the Better Auth configuration issue
2. Suggest debugging steps
3. Provide a working solution
4. Explain how to prevent this in the future
```

### **8. Performance Issues**

```markdown
I'm experiencing performance issues in my React + tRPC + Drizzle ORM + Better Auth app:

Symptoms:
- [Describe the performance problem]
- [How long does it take?]
- [When does it happen?]

Context:
- [Describe your setup and data size]
- [What operations are slow?]
- [Any recent changes that might have caused this?]

Here's the relevant code:
[Paste the code that might be causing performance issues]

Please help me:
1. Identify performance bottlenecks
2. Suggest optimization strategies
3. Show me optimized code examples
4. Recommend monitoring tools
5. Check React Query caching strategies
6. Optimize controller function performance
```

## 🏗️ **Architecture & Best Practices Prompts**

### **9. Code Review & Improvement**

```markdown
Please review this code from my React + tRPC + Drizzle ORM + Better Auth boilerplate:

[Paste your code]

Focus on:
1. TypeScript best practices and type safety
2. Security considerations (authentication, validation, etc.)
3. Performance optimization opportunities
4. Code organization and readability
5. Following the existing patterns in the codebase
6. Error handling and edge cases
7. Better Auth integration patterns
8. Controller organization and structure
9. React Query usage and optimization
10. CORS and environment variable handling

Please provide:
1. Specific issues found
2. Improvement suggestions
3. Code examples for fixes
4. Best practice recommendations
5. Controller structure improvements
6. React Query optimization suggestions
```

### **10. Add New Feature Architecture**

```markdown
I want to add [FeatureName] to my React + tRPC + Drizzle ORM + Better Auth boilerplate.

Feature description:
[Describe what the feature should do]

Requirements:
- [List functional requirements]
- [Specify user roles and permissions]
- [Describe data relationships]
- [Include any external integrations]

Please help me plan:
1. Database changes needed (entities, relationships, migrations)
2. Backend controller structure (individual functions in folders)
3. tRPC router setup
4. Frontend components and pages
5. React Query integration
6. Authentication and authorization requirements
7. Data validation and error handling
8. Testing strategy
9. Better Auth integration points
10. CORS and environment configuration

Follow the existing architecture patterns in the codebase:
- Controller organization (individual function folders)
- React Query for data management
- Better Auth for authentication
- Environment variable handling
```

### **11. Security Review**

```markdown
Please review this code for security issues:

[Paste your code]

Focus on:
1. Authentication and authorization
2. Input validation and sanitization
3. SQL injection prevention
4. XSS protection
5. CSRF protection
6. Rate limiting considerations
7. Data privacy and access control
8. Better Auth security best practices
9. CORS configuration security
10. Environment variable security
11. Controller function security

Please identify:
1. Security vulnerabilities
2. Potential attack vectors
3. Security best practices to implement
4. Code examples for secure implementation
5. CORS and environment variable security issues
6. Controller-level security considerations
```

## 📚 **Learning & Understanding Prompts**

### **12. Explain Code Patterns**

```markdown
I'm trying to understand how [PatternName] works in this boilerplate.

Context:
- [Describe what you're trying to learn]
- [What specific part is confusing?]
- [What have you tried to understand so far?]

Here's the relevant code:
[Paste the code you want explained]

Please explain:
1. How this pattern works
2. Why it's designed this way
3. How it fits into the overall architecture
4. Examples of how to use it
5. Best practices for implementing it
6. How it relates to the controller structure
7. React Query integration if applicable
8. Better Auth integration if applicable
```

### **13. Learn Best Practices**

```markdown
I want to learn best practices for [TopicName] in React + tRPC + Drizzle ORM + Better Auth development.

Context:
- [Describe your experience level]
- [What specific aspects you want to learn]
- [Any challenges you're facing]

Please teach me:
1. Core concepts and principles
2. Best practices and patterns
3. Common pitfalls to avoid
4. Code examples and templates
5. How to implement this in the existing boilerplate
6. Controller organization best practices
7. React Query optimization techniques
8. Better Auth security considerations
9. CORS and environment variable management
10. Resources for further learning
```

## 🚀 **Deployment & Production Prompts**

### **14. Production Deployment**

```markdown
I want to deploy my React + tRPC + Drizzle ORM + Better Auth app to production.

Current setup:
- [Describe your hosting environment]
- [Database type and hosting]
- [Domain and SSL setup]
- [Any specific requirements]

Please help me:
1. Prepare the application for production
2. Set up environment variables
3. Configure the database
4. Build and deploy both frontend and backend
5. Set up monitoring and logging
6. Security hardening recommendations
7. Performance optimization for production
8. Better Auth production configuration
9. CORS configuration for production
10. React Query optimization for production
11. Controller performance optimization
```

### **15. Environment Configuration**

```markdown
I need help configuring my React + tRPC + Drizzle ORM + Better Auth app for [EnvironmentName].

Environment: [Development/Staging/Production]
Hosting: [cPanel/VPS/Cloud Platform]
Database: [PostgreSQL/MySQL/SQLite]

Please help me:
1. Set up environment variables
2. Configure database connections
3. Set up Better Auth secrets
4. Configure CORS and security settings
5. Set up logging and monitoring
6. Performance tuning recommendations
7. CORS origin configuration
8. Environment variable validation
9. React Query configuration
10. Controller environment setup
```

## 🎯 **Customization Prompts**

### **16. Modify Existing Features**

```markdown
I want to modify the existing [FeatureName] in my boilerplate.

Current behavior:
[Describe how it currently works]

Desired changes:
[Describe what you want to change]

Please help me:
1. Identify which files need to be modified
2. Show me the specific changes needed
3. Ensure the changes follow existing patterns
4. Update any related types or interfaces
5. Test the modifications
6. Maintain Better Auth integration
7. Update controller structure if needed
8. Ensure React Query compatibility
9. Update CORS configuration if needed
10. Maintain environment variable consistency
```

### **17. Add Custom Styling**

```markdown
I want to customize the styling of [ComponentName] in my React + tRPC + Drizzle ORM + Better Auth boilerplate.

Current styling:
[Describe current appearance]

Desired styling:
[Describe what you want it to look like]

Please help me:
1. Modify the Tailwind CSS classes
2. Create custom CSS if needed
3. Ensure responsive design
4. Follow the existing design system
5. Test on different screen sizes
6. Ensure React Query DevTools styling compatibility
7. Maintain consistent styling across components
```

## 🔄 **Iterative Development Prompts**

### **18. Refine AI Output**

```markdown
The previous response was good, but I need some adjustments:

What was good:
[Describe what worked well]

What needs improvement:
[Describe what needs to be changed]

Specific requirements:
[List specific changes needed]

Please provide:
1. Updated code with the requested changes
2. Explanation of what was modified
3. Any additional considerations
4. Testing recommendations
5. Controller structure updates if needed
6. React Query integration updates if needed
7. CORS configuration updates if needed
```

### **19. Alternative Solutions**

```markdown
I received a solution for [ProblemDescription], but I'd like to explore alternatives.

Current solution:
[Describe the solution you received]

What I'm looking for:
[Describe what you want to explore]

Please provide:
1. Alternative approaches
2. Pros and cons of each approach
3. Code examples for alternatives
4. Recommendations based on your use case
5. Migration path if needed
6. Controller structure alternatives
7. React Query integration alternatives
8. CORS configuration alternatives
```

## 🔐 **Better Auth Specific Prompts**

### **20. Configure Better Auth Feature**

```markdown
I need to configure Better Auth for [FeatureName].

Feature: [Describe the authentication feature]
Requirements: [List specific requirements]

Please help me:
1. Update Better Auth configuration in auth/config.ts
2. Modify database entities if needed
3. Update frontend authentication flow
4. Test the authentication integration
5. Follow existing Better Auth patterns
6. Update CORS configuration if needed
7. Ensure environment variable consistency
8. Update controller authentication if needed

Configuration details:
- [Authentication method]
- [User roles and permissions]
- [Integration points]
- [CORS requirements]
- [Environment variables needed]
```

### **21. Debug Better Auth Issues**

```markdown
I'm experiencing Better Auth issues:

Problem: [Describe the authentication problem]
Error: [Paste error messages]
Context: [When does this happen?]

Please help me:
1. Identify the root cause
2. Check Better Auth configuration
3. Verify database entities
4. Test authentication flow
5. Provide debugging steps
6. Check CORS configuration
7. Verify environment variables
8. Test controller authentication
9. Check React Query integration
```

---

## 💡 **Tips for Using These Templates**

1. **Be Specific** - Fill in all the placeholders with your actual requirements
2. **Provide Context** - Give the AI enough information to understand your situation
3. **Mention Better Auth** - Always specify that you're using Better Auth for authentication
4. **Controller Structure** - Reference the organized controller pattern with individual function folders
5. **React Query** - Mention React Query for data management and DevTools integration
6. **CORS Configuration** - Include CORS and environment variable considerations
7. **Iterate** - Use the refinement prompts to improve AI responses
8. **Validate** - Always review and test AI-generated code

## 🚀 **Getting Started**

1. **Choose** a template that matches your task
2. **Customize** it with your specific requirements
3. **Include** controller structure, React Query, and CORS considerations
4. **Paste** it into your AI assistant
5. **Review** the response and iterate if needed
6. **Implement** the solution in your codebase
7. **Test** the implementation thoroughly

---

**🎉 These templates will help you work more effectively with AI assistants and get better results faster!**
