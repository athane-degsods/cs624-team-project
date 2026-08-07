# A. Stacks

## 1. Implementing

| Area | Stack / Tech | Purpose |
|------|--------------|---------|
| Frontend | React Native | Cross-platform mobile app development |
| Frontend | Zustand | Global state management without prop drilling |
| Frontend | React.memo | Prevent unnecessary re-renders |
| Frontend | useMemo | Memoize expensive values |
| Frontend | createContext / useContext | Shared state access when needed |
| Frontend | TanStack Query or SWR | Cache, stale data handling, and offline synchronization |
| Frontend | React Native Testing Library | UI testing |
| Frontend | React Native DevTools | Debugging and React tree inspection |
| Frontend | Reactotron | Zustand and network monitoring |
| Frontend | ESLint | Code quality and formatting |
| Frontend | Expo Dev Plugins | Debugging and testing support |
| Frontend | Sentry SDK | Error tracking and monitoring |
| Backend | Node.js | Backend runtime |
| Backend | Express | API development |
| Backend | MongoDB | Document database from the original architecture plan |
| Backend | PostgreSQL | Relational database |
| Backend | Prisma | ORM for type-safe database access |
| Backend | Zod | Request/data validation |
| Backend | Prisma Studio | Database schema and data visualization |
| Backend | Postman | API endpoint testing |
| Backend | Vitest | Backend API testing |
| Storage | AWS S3 | Image storage |

The table above consolidates the stacks and technologies described in the reevaluation into one place for quick reference.

## 2. Folder tree
This is the expected folder structure of the bouldering app monorepo after implementing all the stacks and technologies described above. It can be different depending on the stage of development. 
```
bouldering-app/
├── apps/
│   ├── mobile/                   # React Native (Expo) Frontend
│   │   ├── .expo/
│   │   ├── assets/               # Local static assets (fonts, icons, default images)
│   │   ├── src/
│   │   │   ├── api/              # TanStack Query / SWR hooks & API client setup
│   │   │   ├── components/       # Reusable UI components (memoized with React.memo)
│   │   │   ├── context/          # React Contexts (for theme, auth session, etc.)
│   │   │   ├── hooks/            # Custom hooks (utilizing useMemo, useCallback)
│   │   │   ├── navigation/       # React Navigation / Expo Router configurations
│   │   │   ├── screens/          # Top-level screen views
│   │   │   ├── store/            # Zustand global state stores
│   │   │   ├── types/            # TypeScript types/interfaces for frontend
│   │   │   ├── utils/            # Helper functions and Sentry/Reactotron setup
│   │   │   └── App.tsx           # App entry point
│   │   ├── __tests__/            # Frontend tests (React Native Testing Library)
│   │   ├── app.json              # Expo configuration (Sentry plugins, plugins configs)
│   │   ├── reactotron.config.js  # Reactotron config file
│   │   └── package.json
│   │
│   └── server/                   # Node.js + Express Backend
│       ├── prisma/
│       │   ├── migrations/       # PostgreSQL migration history
│       │   └── schema.prisma     # Database schema definition
│       ├── src/
│       │   ├── config/           # Environment variables, AWS S3 SDK setup
│       │   ├── controllers/      # Express route controllers
│       │   ├── middleware/       # Express middlewares (Zod validation, Auth, Sentry)
│       │   ├── routes/           # Express API route definitions
│       │   ├── services/         # Business logic (S3 file uploads, DB queries via Prisma)
│       │   ├── utils/            # Server utility functions
│       │   ├── validations/       # Zod schemas for request validation
│       │   └── index.ts          # Server entry point
│       ├── tests/                # Vitest backend integration and unit tests
│       └── package.json
│
├── .eslintrc.js                  # Shared or root ESLint configuration
├── .gitignore
├── package.json                  # Root monorepo workspace configuration
└── README.md
```

