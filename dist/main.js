"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const security_interceptor_1 = require("./auth/security.interceptor");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, compression_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        disableErrorMessages: false,
    }));
    app.useGlobalInterceptors(new security_interceptor_1.SecurityInterceptor());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:3000',
                'http://localhost:3002',
                'http://localhost:5173',
                'http://127.0.0.1:5173',
                'http://localhost:8080',
                'https://motorgas-workshop-admin.vercel.app',
                /\.vercel\.app$/,
            ];
            if (!origin)
                return callback(null, true);
            const allowed = allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin));
            if (allowed) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'user-id', 'X-Requested-With'],
        credentials: true,
        maxAge: 86400,
    });
    await app.listen(process.env.PORT ?? 3001);
    console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3001}`);
    console.log(`🔒 Security features enabled: Helmet, CORS, Validation`);
}
bootstrap();
//# sourceMappingURL=main.js.map