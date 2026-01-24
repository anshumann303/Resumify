import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/upload', 'routes/upload.tsx'),
    route('/results', 'routes/results.tsx'),
    
    // API routes
    route('/api/analyze-resume', 'routes/api.analyze-resume.ts'),
] satisfies RouteConfig;
