// middleware.js
import { withAuth } from "next-auth/middleware";

// Configure middleware with NextAuth
export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // Redirects unauthenticated users to the sign-in page
  },
  callbacks: {
    authorized: ({ token }) => !!token, // Allows access if the user has a valid token
  },
});

// Specify routes where middleware should be applied
export const config = {
  matcher: ["/issues/new", "/issues/:id/edit"],
};
