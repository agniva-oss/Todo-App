# Todo App - Frontend

A modern, responsive todo application built with [Next.js](https://nextjs.org), [Apollo Client](https://www.apollographql.com/docs/react/), and [Tailwind CSS](https://tailwindcss.com).

## Features

- ✅ **Add, update, and delete todos** - Full CRUD operations with real-time synchronization
- ✅ **Mark todos as complete/incomplete** - Interactive checkboxes with visual feedback
- ✅ **Track update timestamps** - See when each todo was last modified
- ✅ **Progress tracking** - Visual progress bar showing completion percentage
- ✅ **Loading states** - Smooth loading indicators during mutations
- ✅ **Responsive design** - Works seamlessly on desktop and mobile
- ✅ **Type-safe** - Built with TypeScript for reliability

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (React 19)
- **GraphQL Client:** [Apollo Client](https://www.apollographql.com/docs/react/) for data fetching
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with PostCSS
- **Icons:** [Lucide React](https://lucide.dev)
- **Language:** TypeScript

## Project Structure

\`\`\`
frontend/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main todo list page
│   ├── globals.css         # Global styles
│   └── providers.tsx       # Apollo Client provider
├── components/
│   ├── TodoForm.tsx        # Add new todo input
│   ├── TodoItem.tsx        # Individual todo item with actions
│   └── TodoList.tsx        # Main list container with progress tracking
├── graphql/
│   ├── queries.ts          # GraphQL queries (GET_TODOS)
│   └── mutations.ts        # GraphQL mutations (ADD_TODO, UPDATE_TODO, DELETE_TODO)
├── lib/
│   └── apolloClient.ts     # Apollo Client configuration
└── public/                 # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm/bun)
- Running GraphQL backend (configured in \`lib/apolloClient.ts\`)

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

The app will hot-reload as you make changes to components or styles.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

### Adding a Todo

Type your todo text in the input field at the top and press Enter or click Add.

### Managing Todos

- **Toggle completion:** Click the checkbox to mark a todo as done/undone
- **Delete:** Hover over a todo and click the trash icon
- **Track updates:** See "Updated X minutes ago" below each todo

### Features in Action

- **Progress bar:** Shows your completion percentage at the top
- **Loading states:** See spinners during mutations until data refreshes
- **Timestamps:** \`updated_at\` field is automatically set when you toggle or delete

## GraphQL Operations

### Queries

- \`GET_TODOS\` - Fetch all todos with id, title, completed status, timestamps

### Mutations

- \`ADD_TODO(title)\` - Create a new todo
- \`UPDATE_TODO(id, completed, updated_at)\` - Update todo status and timestamp
- \`DELETE_TODO(id)\` - Delete a todo

## Configuration

### Apollo Client

Edit \`lib/apolloClient.ts\` to change the GraphQL endpoint:

\`\`\`typescript
const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: createHttpLink({
    uri: 'your-graphql-endpoint-here', // Configure your backend URL
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});
\`\`\`

### Environment Variables

Create a \`.env.local\` file if needed for environment-specific settings:

\`\`\`bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql
\`\`\`

## Development Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint checks

## Browser Support

Works in all modern browsers supporting ES2020+.

## License

MIT
"@; Set-Content -Path "c:\Users\agniv\todo-app\frontend\README.md" -Value $content