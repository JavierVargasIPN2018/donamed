export type UserRole = "admin" | "user";

export interface UserProfile {
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
}
