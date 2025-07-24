# Commands

This is a monorepo with multiple apps so each command should target specific workspace.
E.g. `npm run build -w <workspace-name>`.

Here are some common commands you can use:
- npm run type:check: Runs TypeScript type checking without building
- npm run format: Uses Prettier to format the code
- npm run lint: Runs ESLint check

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
- For styling solutions, prefer to use latest CSS versions instead of libraries like Tailwind or Bootstrap
- Avoid using deprecated packages or APIs
- Always install packages at the root of the monorepo targeting the correct workspace with -w <workspace-name>
