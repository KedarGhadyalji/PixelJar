import { AuthConfig } from "convex/server";

const authConfig: AuthConfig = {
  providers: [
    {
      // If CLERK_JWT_ISSUER_DOMAIN is set on your Convex Dashboard, it will use it.
      domain:
        process.env.CLERK_JWT_ISSUER_DOMAIN ||
        "https://direct-filly-42.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};

export default authConfig;
