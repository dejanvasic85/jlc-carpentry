# Technical Requirements

- Next.js (located under apps/web)
- Tailwind CSS
- Sanity CMS (schema located under apps/content-studio)
- Accessibility (a11y) compliant 100%
- Responsive design (mobile-first)
- Clean and maintainable code with re-usable React components
- Ensure the use of typescript alias @/ for imports

# Commands

This is a monorepo with multiple apps so each command should target specific workspace.
E.g. `npm run build -w <workspace-name>`.

Here are some common commands you can use:

- npm run type:check: Runs TypeScript type checking without building
- npm run format: Uses Prettier to format the code
- npm run lint: Runs ESLint check
- npm run dev: Starts the development server for the main website but you will need to run it in the background otherwise it will block the terminal

# Code style

- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow

- Be sure to typecheck when you’re done making a series of code changes
- Use `npm run format` whenever the format is not correct
- Prefer running single tests, and not the whole test suite, for performance

# Dependency management

- Always pin dependencies to a specific version
- Ensure to find the latest version of a package before adding it
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with -w <workspace-name>

# Initial requirements from the client

Yeah keen to proceed with the website, the primary colours would be light blue and black/white.
Company name is JLC Carpentry & building services pty ltd. Location would be Alphington but serving all areas of melbourne.
Social media links are @Jlcbuilding and facebook JLC carpentry & Building services. https://g.co/kgs/ZxMwn9o is my google business link. Basic services are Decks, pergolas, walls, doors, cladding, general renovations (bathroom and kitchen renos).
