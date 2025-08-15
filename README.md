# NextJS 15 + MongoDB + NextAuth + TypeScript

A full-stack web application built with Next.js 15, MongoDB, NextAuth.js, and TypeScript. This project started as the [Next.js Learn tutorial](https://nextjs.org/learn) but has been modified to use MongoDB instead of PostgreSQL.

## Features

- **Authentication**: Secure user authentication with NextAuth.js
- **Database**: MongoDB integration for data persistence
- **UI Components**: Custom UI components with Tailwind CSS
- **Dashboard**: Protected dashboard with user management
- **Items Management**: CRUD operations for items
- **Form Validation**: Client and server-side validation
- **TypeScript**: Full TypeScript support for type safety
- **Responsive Design**: Mobile-first responsive design

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RosstonB/nextjs15-mongo-nextauth-ts.git
cd nextjs15-mongo-nextauth-ts
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Add any additional environment variables for OAuth providers
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth configuration
│   │   ├── check-unique/      # Email/name uniqueness validation
│   │   └── signup/            # User registration
│   ├── dashboard/             # Protected dashboard pages
│   ├── login/                 # Login page
│   ├── signup/                # Registration page
│   └── ui/                    # UI components
├── components/                # Reusable React components
├── lib/                       # Utility functions and configurations
│   ├── definitions.ts         # TypeScript type definitions
│   ├── mongodb.ts            # MongoDB connection utility
│   └── utils.ts              # General utilities
├── middleware.ts              # Next.js middleware for auth
└── global.d.ts               # Global TypeScript declarations
```

## Key Features

### Authentication

- User registration and login
- Protected routes with middleware
- Session management with NextAuth.js
- Email and username uniqueness validation

### Dashboard

- User-specific dashboard
- Items management (CRUD operations)
- Responsive navigation
- Loading states and error handling

### Database Integration

- MongoDB Atlas integration
- Custom database utilities
- Type-safe database operations
- Connection pooling and optimization

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/check-unique` - Validate email/username uniqueness
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication

## Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Deployment

This project can be deployed on [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any platform that supports Next.js.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Based on the [Next.js Learn tutorial](https://nextjs.org/learn)
- Modified to use MongoDB instead of PostgreSQL
- Built with the amazing Next.js ecosystem

## Support

If you have any questions or run into issues, please open an issue on GitHub.
