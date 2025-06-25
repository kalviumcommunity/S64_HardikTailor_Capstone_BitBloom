"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const resourceRoutes_1 = __importDefault(require("./routes/resourceRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:5173', 'https://bit-bloom.netlify.app'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.use((req, res, next) => {
    console.log(`📩 [${req.method}] ${req.url} | Origin: ${req.headers.origin}`);
    next();
});
app.use(express_1.default.json());
app.use('/api/resources', resourceRoutes_1.default);
app.use('/api/auth', userRoutes_1.default);
app.use('/api/project', projectRoutes_1.default);
app.get('/test', (req, res) => {
    res.json({ message: 'BitBloom backend working fine ✅' });
});
app.get('/', (req, res) => {
    res.send('Hi, BitBloom Backend is live! 🚀');
});
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
