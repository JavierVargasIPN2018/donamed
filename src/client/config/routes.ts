export const PUBLIC_ROUTES = {
  home: "/",
} as const;

export const AUTH_ROUTES = {
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const ROUTES = {
  ...PUBLIC_ROUTES,
};
