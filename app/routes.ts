import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [

    // Main Layout
    layout('./layout/main-layout.tsx', [
        index("./routes/index.tsx"),
        route("resources", "routes/resources.tsx"),
        route("features", "routes/features.tsx"),
        route("terms-of-service", "routes/terms-of-service.tsx"),
        route("privacy-policy", "routes/privacy-policy.tsx"),
    ]),

    // Dashboard Layout
    layout('./layout/dashboard-layout.tsx', [
        route("user/dashboard", "routes/dashboard.tsx"),
    ]),

    // Auth Layout
    layout('./layout/auth-layout.tsx', [
        route("sign-up", "routes/auth/sign-up.tsx"),
        route("login", "routes/auth/login.tsx"),
        route("logout", "routes/auth/logout.tsx"),
    ]),

    // Download route (no layout needed) - resource route for file downloads
    route("download/:id", "routes/download.$id.tsx"),

    // Static pages Route
    route('terms-of-service' , 'routes/terms-of-service.tsx') , 
    route('privacy-policy' , 'routes/privacy-policy.tsx') , 

    route("*", "routes/_404.tsx"),
] satisfies RouteConfig;
