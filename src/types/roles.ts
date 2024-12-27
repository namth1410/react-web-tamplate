export const Roles = {
  ADMIN: "admin",
  USER: "user",
  UNASSIGNED: "unassigned",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
