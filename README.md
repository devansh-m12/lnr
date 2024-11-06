# LNR - Light Novel Reader Platform

## Overview
LNR is a modern web application built for reading and managing light novels, manga, and manhwa. It provides a sophisticated platform for both readers and content creators, featuring user authentication, content management, and an interactive reading experience.

## Tech Stack

### Core Technologies
- **Frontend Framework**: Next.js 15.0.1 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (Beta)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API**: REST API with Next.js Route Handlers

### Key Dependencies
- **UI Components**: 
  - Radix UI primitives
  - Lucide React icons
  - Framer Motion for animations
- **Forms & Validation**: 
  - React Hook Form
  - Zod for schema validation
- **Rich Text Editing**: 
  - Tiptap
  - React Quill
- **Email**: Nodemailer for transactional emails

## Features

### Authentication & User Management
- Email/Password authentication
- OAuth support through NextAuth.js
- Email verification system
- Role-based authorization (Reader, Author, Admin)
- JWT token management
- Session handling

### Content Management
- Support for multiple content types:
  - Light Novels
  - Manga
  - Manhwa
- Chapter management system
- Content categorization with genres and tags
- Reading progress tracking
- Bookmarking system
- Rating and review system

### Reading Experience
- Customizable reading interface
- Support for both LTR and RTL reading directions
- Progress tracking
- Commenting system with nested replies
- Bookmarking specific pages/sections

### Library Management
- Personal library for users
- Reading status tracking:
  - Plan to Read
  - Reading
  - Completed
  - Dropped
- Last read position memory
- Reading history

## Database Schema

### Core Models
- User
- Content
- Chapter
- ChapterContent
- ChapterImage

### Categorization
- Genre
- Tag
- ContentGenre
- ContentTag

### User Interaction
- Comment
- UserLibrary
- Rating
- ReadingProgress
- Bookmark

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── auth/
│   │   ├── home/
│   │   └── add-content/
│   ├── api/
│   │   ├── auth/
│   │   └── (content)/
│   └── provider.tsx
├── components/
│   ├── ui/
│   └── StarBackground.tsx
├── hooks/
├── types/
├── utils/
└── validations/

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Environment Setup
Create a `.env.local` file with the following variables:
```env
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
JWT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
EMAIL_SERVER=
EMAIL_FROM=
```

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npm run db:migrate

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Development Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint:check` - Check for linting issues
- `npm run lint:fix` - Fix linting issues
- `npm run format:fix` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run db:seed` - Seed database with sample data
- `npm run db:migrate` - Run database migrations

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- All contributors and maintainers
