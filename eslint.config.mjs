import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rules to enforce architecture
  {
    rules: {
      // Prevent cross-imports between client and server
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/server/*", "**/server/**"],
              message:
                "❌ Client cannot import from Server directly. Use API endpoints or shared types.",
            },
            {
              group: ["**/client/*", "**/client/**"],
              message:
                "❌ Server cannot import from Client. Keep business logic independent of UI.",
            },
          ],
        },
      ],
    },
  },
  // Allow API routes to import from server (this is correct architecture)
  {
    files: ["src/app/api/**/*"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
]);

export default eslintConfig;
