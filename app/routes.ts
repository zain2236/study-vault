import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    
    layout('./layout/main-layout.tsx' , [
        index("./routes/home.tsx"),
    route("resources", "routes/resources.tsx"),
    route("features", "routes/features.tsx"),
    ]) , 
    layout('./layout/dashboard-layout.tsx', [
        route("user/dashboard", "routes/dashboard.tsx"),
    ]),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("logout", "routes/auth/logout.tsx"),
    route("*" , "routes/_404.tsx"),
] satisfies RouteConfig;
