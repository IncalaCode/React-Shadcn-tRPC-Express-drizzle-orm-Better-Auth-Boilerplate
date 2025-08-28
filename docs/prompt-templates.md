# 📝 Prompt Templates for AI Development

Ready-to-use prompts for working with AI assistants on this React + tRPC + Express + TypeORM + Better Auth boilerplate.

## 🎯 **How to Use These Templates**

1. **Copy** the prompt template
2. **Customize** the placeholders (text in `[brackets]`)
3. **Paste** into your AI assistant
4. **Review** and **iterate** on the response

## 🚀 **Feature Development Prompts**

### **1. Add New Database Entity**

```markdown
I need to add a new [EntityName] entity to my React + tRPC + TypeORM + Better Auth boilerplate.

Requirements:
- [List the fields and their types]
- [Describe relationships with other entities]
- [Specify validation rules]
- [Include any special behaviors]

Please create:
1. TypeORM entity with proper decorators
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
I need to add a new BlogPost entity to my React + tRPC + TypeORM + Better Auth boilerplate.

Requirements:
- Blog posts have title, content, author, publish date, and status
- Posts belong to a user (author)
- Posts can be published or draft
- Title and content are required
- Content can be long text

Please create:
1. TypeORM entity with proper decorators
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

### **2. Create tRPC Procedures**

```markdown
I need to create tRPC procedures for [EntityName] CRUD operations.

Requirements:
- [List the operations needed: create, read, update, delete, list, search]
- [Specify authentication requirements for each operation]
- [Describe any special business logic]
- [Include pagination if needed]

Please create:
1. Input validation schemas using Zod
2. tRPC procedures following the existing pattern
3. Proper error handling and validation
4. Follow the exact structure from the existing routers

Operations needed:
- [Operation 1]: [Description] - [Auth level required]
- [Operation 2]: [Description] - [Auth level required]
- [Operation 3]: [Description] - [Auth level required]
```

**Example:**
```markdown
I need to create tRPC procedures for BlogPost CRUD operations.

Requirements:
- Users can create, read, update, delete their own posts
- Public users can read published posts
- Admins can manage all posts
- Include pagination for listing posts
- Search functionality for public posts

Please create:
1. Input validation schemas using Zod
2. tRPC procedures following the existing pattern
3. Proper error handling and validation
4. Follow the exact structure from the existing routers

Operations needed:
- create: Create new blog post - Authenticated users only
- list: List published posts with pagination - Public access
- get: Get single post by ID - Public access for published, author access for drafts
- update: Update post - Author or admin only
- delete: Delete post - Author or admin only
- search: Search published posts - Public access
```

### **3. Build React Components**

```markdown
I need to create React components for [FeatureName].

Requirements:
- [Describe the UI components needed]
- [Specify the data they should display/edit]
- [Include any user interactions]
- [Describe the styling approach]

Please create:
1. Main component with proper TypeScript interfaces
2. Form components if needed (using react-hook-form)
3. List/display components if needed
4. Follow the existing component patterns
5. Use Tailwind CSS for styling
6. Include proper error handling and loading states

Components needed:
- [Component 1]: [Purpose] - [Props and behavior]
- [Component 2]: [Purpose] - [Props and behavior]
- [Component 3]: [Purpose] - [Props and behavior]
```

**Example:**
```markdown
I need to create React components for BlogPost management.

Requirements:
- Users can create and edit blog posts
- Display list of user's posts with edit/delete options
- Form for creating/editing posts
- Preview of published posts

Please create:
1. Main component with proper TypeScript interfaces
2. Form components if needed (using react-hook-form)
3. List/display components if needed
4. Follow the existing component patterns
5. Use Tailwind CSS for styling
6. Include proper error handling and loading states

Components needed:
- BlogPostForm: Create/edit form with title, content, and status fields
- BlogPostList: Display user's posts with pagination and actions
- BlogPostCard: Individual post display with edit/delete buttons
- BlogPostPreview: Preview of post content before publishing
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
I'm getting TypeScript errors in my React + tRPC + TypeORM + Better Auth boilerplate:

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
I'm experiencing a runtime error in my React + tRPC + TypeORM + Better Auth app:

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
I'm experiencing performance issues in my React + tRPC + TypeORM + Better Auth app:

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
```

## 🏗️ **Architecture & Best Practices Prompts**

### **9. Code Review & Improvement**

```markdown
Please review this code from my React + tRPC + TypeORM + Better Auth boilerplate:

[Paste your code]

Focus on:
1. TypeScript best practices and type safety
2. Security considerations (authentication, validation, etc.)
3. Performance optimization opportunities
4. Code organization and readability
5. Following the existing patterns in the codebase
6. Error handling and edge cases
7. Better Auth integration patterns

Please provide:
1. Specific issues found
2. Improvement suggestions
3. Code examples for fixes
4. Best practice recommendations
```

### **10. Add New Feature Architecture**

```markdown
I want to add [FeatureName] to my React + tRPC + TypeORM + Better Auth boilerplate.

Feature description:
[Describe what the feature should do]

Requirements:
- [List functional requirements]
- [Specify user roles and permissions]
- [Describe data relationships]
- [Include any external integrations]

Please help me plan:
1. Database changes needed (entities, relationships, migrations)
2. Backend API endpoints (tRPC procedures)
3. Frontend components and pages
4. Authentication and authorization requirements
5. Data validation and error handling
6. Testing strategy
7. Better Auth integration points

Follow the existing architecture patterns in the codebase.
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

Please identify:
1. Security vulnerabilities
2. Potential attack vectors
3. Security best practices to implement
4. Code examples for secure implementation
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
```

### **13. Learn Best Practices**

```markdown
I want to learn best practices for [TopicName] in React + tRPC + TypeORM + Better Auth development.

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
6. Resources for further learning
```

## 🚀 **Deployment & Production Prompts**

### **14. Production Deployment**

```markdown
I want to deploy my React + tRPC + TypeORM + Better Auth app to production.

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
```

### **15. Environment Configuration**

```markdown
I need help configuring my React + tRPC + TypeORM + Better Auth app for [EnvironmentName].

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
```

### **17. Add Custom Styling**

```markdown
I want to customize the styling of [ComponentName] in my React + tRPC + TypeORM + Better Auth boilerplate.

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

Configuration details:
- [Authentication method]
- [User roles and permissions]
- [Integration points]
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
```

---

## 💡 **Tips for Using These Templates**

1. **Be Specific** - Fill in all the placeholders with your actual requirements
2. **Provide Context** - Give the AI enough information to understand your situation
3. **Mention Better Auth** - Always specify that you're using Better Auth for authentication
4. **Iterate** - Use the refinement prompts to improve AI responses
5. **Validate** - Always review and test AI-generated code

## 🚀 **Getting Started**

1. **Choose** a template that matches your task
2. **Customize** it with your specific requirements
3. **Paste** it into your AI assistant
4. **Review** the response and iterate if needed
5. **Implement** the solution in your codebase

---

**🎉 These templates will help you work more effectively with AI assistants and get better results faster!**
