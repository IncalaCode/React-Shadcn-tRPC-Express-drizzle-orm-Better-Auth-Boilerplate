# 🤖 AI-Assisted Development Guide

This guide teaches you how to work effectively with AI assistants (like Claude, GPT, or Copilot) when developing with this React + tRPC + Express + Drizzle ORM + Better Auth boilerplate.

## 🎯 **Why AI-Assisted Development?**

- **🚀 Faster Development** - Generate boilerplate code quickly
- **🔍 Better Debugging** - AI can spot patterns and suggest fixes
- **📚 Learning Tool** - Understand patterns and best practices
- **🔄 Code Consistency** - Maintain uniform coding standards

## 🏗️ **Understanding the Architecture**

### **Key Concepts for AI**
When working with AI, explain these concepts clearly:

```
Frontend (React) ←→ Better Auth Client ←→ Better Auth Server ←→ Express.js ←→ Drizzle ORM ←→ Database
     ↑                    ↑                    ↑                    ↑           ↑
  TypeScript          TypeScript           TypeScript          TypeScript   TypeScript
```

**Important**: The entire stack is TypeScript with **end-to-end type safety** and **Better Auth** for authentication!

### **File Structure Patterns**
```
backend/src/
├── trpc/              # tRPC setup and routers
│   ├── routers/       # tRPC routers (auth, user)
│   └── middleware/    # tRPC middleware
├── controllers/       # Organized controller functions
│   ├── auth/          # Auth controllers (signUp, signIn, etc.)
│   └── user/          # User controllers (getProfile, updateProfile, etc.)
├── database/          # Drizzle ORM schema and connections
├── auth/              # Better Auth configuration
├── middleware/        # Express middleware (auth, validation)
├── services/          # Business logic
└── utils/             # Helper functions (CORS, logging, security)

frontend/src/
├── components/        # Reusable UI components
├── pages/             # Route components
├── layouts/           # Page layouts
├── contexts/          # React contexts (auth)
├── providers/         # React providers (React Query)
├── lib/               # Utilities and configurations
└── types/             # TypeScript type definitions
```

## 🚀 **Effective AI Prompts**

### **1. Adding New Features**

**❌ Bad Prompt:**
```
"Add a blog post feature"
```

**✅ Good Prompt:**
```
"I need to add a blog post feature to this React + tRPC + Drizzle ORM + Better Auth boilerplate. 

Requirements:
- Blog posts have title, content, author, and publish date
- Users can create, read, update, delete posts
- Only authenticated users can create/edit posts
- Public users can read published posts
- Use React Query for data management

Please create:
1. Drizzle ORM schema for BlogPost
2. Controller functions in controllers/blogPost/ folders
3. Main controller file that imports all functions
4. tRPC router that uses the controller
5. React components with React Query integration
6. Update the shared types

Follow the existing controller organization pattern and React Query setup."
```

### **2. Debugging Issues**

**❌ Bad Prompt:**
```
"My app is broken, fix it"
```

**✅ Good Prompt:**
```
"I'm getting this error in my React + tRPC + Drizzle ORM + Better Auth app:

Error: [Error details here]
Stack trace: [Stack trace here]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me understand what's wrong and how to fix it."
```

### **3. Code Review & Improvement**

**❌ Bad Prompt:**
```
"Review this code"
```

**✅ Good Prompt:**
```
"Please review this code from my React + tRPC + Drizzle ORM + Better Auth boilerplate:

[Paste your code]

Focus on:
1. TypeScript best practices
2. Security considerations
3. Performance optimization
4. Code organization
5. Following the existing patterns
6. Controller organization and structure
7. React Query usage and optimization
8. CORS and environment variable handling

Suggest specific improvements with explanations."
```

## 🔧 **AI Coding Workflows**

### **Workflow 1: Feature Development**

1. **Plan with AI**
   ```
   "Help me plan the [feature name] for my app. What components, 
   database changes, and API endpoints will I need?"
   ```

2. **Generate Database Schema**
   ```
   "Create a Drizzle ORM schema for [entity name] with these fields: [list fields]. 
   Include proper column types, validation, and relationships."
   ```

3. **Create Controller Functions**
   ```
   "Create controller functions for [entity name] CRUD operations in 
   controllers/[entity]/ folders. Follow the pattern from existing controllers."
   ```

4. **Create tRPC Router**
   ```
   "Create a tRPC router for [entity name] that uses the controller functions. 
   Follow the pattern from the existing routers."
   ```

5. **Build React Components**
   ```
   "Create React components for [feature name] with React Query integration. 
   Use Tailwind CSS and follow the existing component patterns."
   ```

6. **Integrate Everything**
   ```
   "Help me integrate the [feature name] into my app. 
   Update routing, navigation, React Query setup, and state management."
   ```

### **Workflow 2: Bug Fixing**

1. **Describe the Problem**
   ```
   "I'm experiencing [describe issue]. Here's what I've tried: [list attempts]. 
   What could be causing this?"
   ```

2. **Get Debugging Steps**
   ```
   "What debugging steps should I take to isolate this issue? 
   What logs should I check?"
   ```

3. **Code Review**
   ```
   "Can you review this code for potential issues? 
   [Paste problematic code]"
   ```

4. **Implement Fix**
   ```
   "Based on the issue, can you suggest a fix? 
   Please explain why this solution works."
   ```

## 📚 **Code Generation Patterns**

### **Drizzle ORM Schema Pattern**
```typescript
// AI should follow this pattern:
import { mysqlTable, varchar, datetime, primaryKey } from "drizzle-orm/mysql-core";

export const entityName = mysqlTable("table_name", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: datetime("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()).notNull(),
});
```

### **Controller Organization Pattern**
```typescript
// AI should follow this pattern for controllers:
// controllers/entity/operation/operation.ts
export const operation = async (input: OperationInput, ctx: Context) => {
  // Implementation
};

// controllers/entity/entity.controller.ts
import { operation } from './operation/operation';
import { anotherOperation } from './anotherOperation/anotherOperation';

export const entityController = {
  operation,
  anotherOperation,
};
```

### **tRPC Router Pattern**
```typescript
// AI should follow this pattern:
import { entityController } from '../../controllers/entity/entity.controller';

export const entityRouter = router({
  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      return entityController.create(input, ctx);
    }),
    
  list: publicProcedure
    .input(paginationSchema)
    .query(async ({ input }) => {
      return entityController.list(input);
    }),
});
```

### **React Component with React Query Pattern**
```typescript
// AI should follow this pattern:
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ComponentProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentProps> = ({ 
  // Destructured props 
}) => {
  const queryClient = useQueryClient();
  
  // React Query hooks
  const { data, isLoading, error } = useQuery({
    queryKey: ['entity', 'list'],
    queryFn: () => fetchEntities(),
  });
  
  const mutation = useMutation({
    mutationFn: createEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entity'] });
    },
  });
  
  // Event handlers
  
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
};
```

### **Better Auth Integration Pattern**
```typescript
// AI should understand Better Auth patterns:
// Backend: auth/config.ts for Better Auth configuration
// Frontend: lib/auth.ts for Better Auth client
// Schema: User, Session, Account, Verification for Drizzle ORM
// Controllers: Use auth context in controller functions
// CORS: Configure trusted origins in auth/config.ts
```

### **CORS and Environment Variable Pattern**
```typescript
// AI should understand CORS configuration:
// utils/cors.ts: resolveCorsOrigin utility function
// index.ts: Use resolveCorsOrigin for CORS configuration
// env.example: CORS_ORIGIN with environment variable substitution
// auth/config.ts: Use resolveCorsOrigin for trustedOrigins
```

## 🚨 **Common AI Pitfalls & Solutions**

### **Pitfall 1: Ignoring Type Safety**
**Problem**: AI generates code without proper TypeScript types
**Solution**: Always ask for complete type definitions

```
"Please include complete TypeScript types for all functions, 
parameters, and return values."
```

### **Pitfall 2: Breaking Existing Patterns**
**Problem**: AI creates inconsistent code that doesn't match the codebase
**Solution**: Reference existing code

```
"Follow the exact same pattern used in [existing file]. 
Use the same naming conventions, structure, and style."
```

### **Pitfall 3: Missing Error Handling**
**Problem**: AI generates code without proper error handling
**Solution**: Explicitly request error handling

```
"Please include proper error handling, validation, 
and user feedback for all operations."
```

### **Pitfall 4: Security Oversights**
**Problem**: AI misses security considerations
**Solution**: Ask for security review

```
"Please review this code for security issues, 
especially authentication and authorization."
```

### **Pitfall 5: Ignoring Better Auth Integration**
**Problem**: AI doesn't understand Better Auth patterns
**Solution**: Explicitly mention Better Auth requirements

```
"Remember this app uses Better Auth for authentication. 
Please follow Better Auth patterns and integrate with existing auth flow."
```

### **Pitfall 6: Ignoring Controller Organization**
**Problem**: AI creates monolithic files instead of organized controllers
**Solution**: Reference the controller organization pattern

```
"Please organize the functions into individual files within controllers/[entity]/ folders, 
then create a main controller file that imports all functions."
```

### **Pitfall 7: Missing React Query Integration**
**Problem**: AI doesn't use React Query for data management
**Solution**: Explicitly request React Query integration

```
"Please use React Query for data fetching and mutations. 
Include proper query keys, error handling, and cache invalidation."
```

### **Pitfall 8: Ignoring CORS Configuration**
**Problem**: AI doesn't consider CORS and environment variables
**Solution**: Mention CORS and environment variable requirements

```
"Please ensure CORS configuration is properly set up and 
environment variables are handled correctly."
```

## 🔍 **Debugging with AI**

### **Error Analysis**
```
"Analyze this error message:
[Error message]

What does it mean? What are the most common causes? 
What debugging steps should I take?"
```

### **Code Review**
```
"Review this code for potential issues:
[Code block]

Look for:
- TypeScript errors
- Security vulnerabilities
- Performance issues
- Code quality problems"
```

### **Performance Optimization**
```
"Analyze this code for performance issues:
[Code block]

Suggest optimizations for:
- Database queries
- React rendering
- API calls
- Memory usage
- React Query caching strategies
- Controller function performance
- CORS configuration efficiency"
```

## 📝 **Best Practices for AI Collaboration**

### **1. Be Specific**
- Provide clear requirements
- Include context about your setup
- Specify the exact output format you want

### **2. Reference Existing Code**
- Point to similar features in your codebase
- Ask AI to follow existing patterns
- Share relevant code snippets
- Reference controller organization patterns
- Mention React Query setup
- Include CORS configuration examples

### **3. Iterate and Refine**
- Start with high-level requests
- Refine based on AI output
- Ask for improvements and alternatives

### **4. Validate AI Output**
- Always review generated code
- Test functionality
- Check for security issues
- Ensure it follows your patterns
- Verify controller organization
- Test React Query integration
- Check CORS configuration

### **5. Learn from AI**
- Ask for explanations of complex concepts
- Request best practice recommendations
- Learn new patterns and approaches

## 🎯 **Example AI Sessions**

### **Session 1: Adding User Profile Feature**
```
User: "I want to add a user profile feature where users can edit their information"

AI: "I'll help you create a user profile feature. Let me break this down:
1. Update the User entity to include profile fields
2. Create controller functions in controllers/user/ folders
3. Create tRPC router that uses the controller
4. Build React components with React Query integration
5. Add profile routes to the frontend

Let's start with the database changes..."

User: "Great! Please create the TypeORM entity updates first"

AI: "Here's the updated User entity with profile fields..."
```

### **Session 2: Fixing Authentication Bug**
```
User: "I'm getting 'Unauthorized' errors when trying to access protected routes"

AI: "Let me help debug this. Can you share:
1. The exact error message
2. The route you're trying to access
3. Your Better Auth setup
4. CORS configuration
5. Any relevant code snippets

This will help me identify the issue..."

User: "Here's the error and code..."

AI: "I can see the issue. The problem is in the Better Auth configuration and CORS setup..."
```

### **Session 3: Setting up React Query DevTools**
```
User: "My React Query DevTools are empty, how do I fix this?"

AI: "Let me help you set up React Query DevTools properly. The issue is likely:
1. Duplicate QueryClient instances
2. Missing React Query usage in components
3. Incorrect provider setup

Let me check your current setup and provide a solution..."

User: "Here's my current TRPCProvider setup..."

AI: "I can see the issue. You have duplicate QueryClient instances. Let me help you consolidate them..."
```

## 🚀 **Getting Started with AI**

1. **Read this guide** to understand best practices
2. **Start with simple requests** to test AI capabilities
3. **Be specific** about your requirements and context
4. **Reference controller organization** and React Query patterns
5. **Include CORS and environment variable** considerations
6. **Validate all output** before implementing
7. **Learn from each interaction** to improve future prompts

## 🔐 **Better Auth Specific Guidelines**

### **When Working with AI on Authentication**
1. **Always mention Better Auth**: "This app uses Better Auth for authentication"
2. **Reference existing patterns**: "Follow the pattern in auth/config.ts"
3. **Understand the flow**: Better Auth handles auth, tRPC uses auth context
4. **Entity relationships**: User, Session, Account, Verification entities
5. **Controller integration**: Use auth context in controller functions
6. **CORS configuration**: Configure trusted origins properly

### **Common Better Auth Tasks**
```
"Help me configure Better Auth for [feature]"
"Create a new authentication flow using Better Auth"
"Integrate OAuth provider with Better Auth"
"Set up email verification with Better Auth"
"Configure CORS for Better Auth"
"Set up environment variables for Better Auth"
```

### **Common Controller Organization Tasks**
```
"Help me organize [feature] functions into controller folders"
"Create a main controller file that imports all functions"
"Set up tRPC router that uses controller functions"
"Follow the existing controller organization pattern"
```

### **Common React Query Tasks**
```
"Set up React Query for [feature] data management"
"Create React Query hooks for [feature] operations"
"Configure React Query DevTools properly"
"Optimize React Query caching strategies"
```

---

**🎉 Remember**: AI is a powerful tool, but you're the developer. Use it to accelerate your work, not replace your thinking. Always review, test, and understand the code you're implementing.
