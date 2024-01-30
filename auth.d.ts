import "next-auth"

declare module "next-auth" {
  interface User {
    group?: "Admin"
  }
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User
  }
}
