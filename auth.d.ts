import "next-auth"

declare module "next-auth" {
  interface User {
    group?: "Admin"
  }

  interface Session {
    user: User
  }
}
