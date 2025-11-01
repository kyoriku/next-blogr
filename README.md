# Blogr

A full-stack blogging platform where developers can create, edit, and publish technical articles with authentication.

**[Live Site](https://your-app.vercel.app)** | **Tech Stack:** Next.js, Prisma, NextAuth, PostgreSQL, TypeScript

**Key Features:** GitHub OAuth authentication • Markdown support • Draft/publish workflow • Server-side rendering • Type-safe database queries

![Home Page](./public/screenshots/home.png)

<details>
<summary><b>Built With</b></summary>

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)](https://www.postgresql.org/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white)](https://next-auth.js.org/)

</details>

## Table of Contents
- [Technical Details](#technical-details)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Technical Details

**Frontend**
- Next.js 16 with React Server Components
- TypeScript for type safety
- Server-side rendering (SSR) and static site generation (SSG)
- React Markdown for content rendering with syntax highlighting
- Styled JSX for component-scoped CSS
- Responsive design with mobile-first approach

**Backend**
- Next.js API Routes for serverless functions
- RESTful API endpoints (POST, DELETE, PUT)
- Server-side session management with NextAuth
- Type-safe API handlers with TypeScript

**Database**
- PostgreSQL database hosted on Prisma Data Platform
- Prisma ORM for type-safe database queries
- Schema with User, Post, Account, Session, and VerificationToken models
- UUID primary keys for security
- Relational data with foreign key constraints

**Authentication**
- NextAuth.js for OAuth integration
- GitHub OAuth provider
- JWT session strategy for stateless authentication
- HTTP-only cookies for secure session storage
- PrismaAdapter for database session persistence
- Protected routes and API endpoints

**Features**
- User authentication via GitHub
- Create, edit, and delete blog posts
- Draft/publish workflow
- Public feed of published posts
- Personal drafts page
- Author attribution on posts
- Markdown content support
- Server-side rendering for SEO optimization

**Deployment**
- Deployed on Vercel with automatic deployments
- Environment variable management via Vercel dashboard
- PostgreSQL database on Prisma Accelerate
- Production-ready with optimized builds

## Screenshots
<details>
<summary><b>View More Screenshots</b></summary>

![Create Post](./public/screenshots/create.png)
![Drafts Page](./public/screenshots/drafts.png)
![Post Detail](./public/screenshots/post.png)

</details>

## Installation
To run this project locally:

1. Clone the repository
    ```bash
    git clone https://github.com/kyoriku/blogr-nextjs-prisma.git
    ```

2. Navigate to the project directory
    ```bash
    cd blogr-nextjs-prisma
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory
    ```bash
    # Database Configuration
    POSTGRES_URL_NON_POOLING='your_postgres_connection_string'
    POSTGRES_PRISMA_URL='your_prisma_accelerate_url'
    
    # NextAuth Configuration
    NEXTAUTH_URL='http://localhost:3000'
    SECRET='your_nextauth_secret'
    
    # GitHub OAuth Configuration
    GITHUB_ID='your_github_oauth_client_id'
    GITHUB_SECRET='your_github_oauth_client_secret'
    ```

5. Generate Prisma Client
    ```bash
    npx prisma generate
    ```

6. Push the database schema
    ```bash
    npx prisma db push
    ```

7. Set up GitHub OAuth Application
    - Go to [GitHub Developer Settings](https://github.com/settings/developers)
    - Create a new OAuth App
    - Set Homepage URL: `http://localhost:3000`
    - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
    - Copy Client ID and Client Secret to `.env.local`

## Usage
1. Start the development server
    ```bash
    npm run dev
    ```

2. Access the application at `http://localhost:3000`

3. Click "Log in" and authenticate with GitHub

4. Create posts, manage drafts, and publish articles

5. View published posts on the public feed

## Roadmap
- [x] GitHub OAuth authentication
- [x] CRUD operations for posts
- [x] Draft/publish workflow
- [x] Server-side rendering
- [x] Production deployment on Vercel
- [ ] Rich text editor with live preview
- [ ] Post categories and tags
- [ ] Search functionality
- [ ] Comment system
- [ ] User profiles with bio
- [ ] Social sharing features
- [ ] Reading time estimates
- [ ] Post analytics

## Contributing
Contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit and push to your branch
5. Open a Pull Request

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=mit)](https://opensource.org/licenses/MIT)

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Questions
For questions, email me at devkyoriku@gmail.com.