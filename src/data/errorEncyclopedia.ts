export interface ErrorEntry {
  code: string;
  name: string;
  group: "HTTP/Web Errors" | "Development Errors";
  description: string;
  explanation: string;
  example?: string;
}

export const errorEntries: ErrorEntry[] = [
  {
    code: "400",
    name: "Bad Request",
    group: "HTTP/Web Errors",
    description: "The server could not understand the request.",
    explanation:
      "Something about the request is malformed, missing, or invalid before the server can safely process it.",
    example: "Submitting JSON with a missing closing brace to an API endpoint.",
  },
  {
    code: "401",
    name: "Unauthorized",
    group: "HTTP/Web Errors",
    description: "Authentication is required or failed.",
    explanation:
      "The server needs proof of who you are, such as a valid token, cookie, or login session.",
    example: "Calling a private API route without an Authorization header.",
  },
  {
    code: "403",
    name: "Forbidden",
    group: "HTTP/Web Errors",
    description: "The server understood the request but refused access.",
    explanation:
      "You may be signed in, but your account or role does not have permission for that resource.",
    example: "A regular user trying to open an admin-only dashboard.",
  },
  {
    code: "404",
    name: "Not Found",
    group: "HTTP/Web Errors",
    description: "The requested resource does not exist at that location.",
    explanation:
      "The URL, route, file, or feature could not be matched by the application or server.",
    example: "Opening /api/users/9999 when that user ID does not exist.",
  },
  {
    code: "429",
    name: "Too Many Requests",
    group: "HTTP/Web Errors",
    description: "The client has sent too many requests in a short time.",
    explanation:
      "Rate limiting is protecting the service. Waiting and retrying later usually fixes it.",
    example: "Refreshing a page that calls the same API hundreds of times.",
  },
  {
    code: "500",
    name: "Internal Server Error",
    group: "HTTP/Web Errors",
    description: "The server hit an unexpected problem.",
    explanation:
      "The request reached the server, but server-side code or infrastructure failed while handling it.",
    example: "A database query throws because a required table is missing.",
  },
  {
    code: "502",
    name: "Bad Gateway",
    group: "HTTP/Web Errors",
    description: "A gateway received an invalid response upstream.",
    explanation:
      "One server is acting as a middle layer and cannot get a valid response from another service.",
    example: "A reverse proxy cannot reach the application server behind it.",
  },
  {
    code: "GIT",
    name: "Merge Conflict",
    group: "Development Errors",
    description: "Git cannot automatically combine competing file changes.",
    explanation:
      "Two branches changed the same part of a file, so a developer needs to choose the final version.",
    example: "Both branches edit the same function body in different ways.",
  },
  {
    code: "TS",
    name: "TypeScript Type Mismatch",
    group: "Development Errors",
    description: "A value does not match the type TypeScript expects.",
    explanation:
      "The code may run incorrectly because a function, variable, or component received the wrong shape of data.",
    example: "Passing a string to a function that expects a number.",
  },
  {
    code: "REACT",
    name: "Invalid Hook Call",
    group: "Development Errors",
    description: "A React hook is being called from an invalid location.",
    explanation:
      "Hooks must run inside React function components or custom hooks, and they must run in the same order each render.",
    example:
      "Calling useState inside an if block or a regular utility function.",
  },
  {
    code: "MODULE",
    name: "Module Not Found",
    group: "Development Errors",
    description: "The bundler cannot resolve an imported file or package.",
    explanation:
      "The import path, package installation, file extension, or export name may be incorrect.",
    example: "Importing ./Button when the file is named Buttons.tsx.",
  },
  {
    code: "BUILD",
    name: "Build Failed",
    group: "Development Errors",
    description: "The project could not be compiled into a runnable build.",
    explanation:
      "The build pipeline stopped because of type errors, syntax errors, missing files, or failed tooling steps.",
    example:
      "Vite stops because TypeScript found an unused imported component.",
  },
];
