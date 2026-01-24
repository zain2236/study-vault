import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("resources", "routes/resources.tsx"),
] satisfies RouteConfig;
