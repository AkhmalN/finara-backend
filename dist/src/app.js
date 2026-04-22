"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const license_routes_1 = __importDefault(require("./modules/licenses/license.routes"));
const category_routes_1 = __importDefault(require("./modules/categories/category.routes"));
const transaction_routes_1 = __importDefault(require("./modules/transactions/transaction.routes"));
const budget_routes_1 = __importDefault(require("./modules/budgets/budget.routes"));
const goal_routes_1 = __importDefault(require("./modules/goals/goal.routes"));
const app = (0, express_1.default)();
// security headers
app.use((0, helmet_1.default)());
// CORS
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
}));
// body parser
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    // detail logs in development
    app.use((0, morgan_1.default)("combined"));
}
else {
    // production friendly logs
    app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", {
        skip: (req, res) => res.statusCode < 400,
    }));
}
// logging (dev only)
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/licenses", license_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/budgets", budget_routes_1.default);
app.use("/api/goals", goal_routes_1.default);
app.get("/health", async (req, res) => {
    res.json({ status: "OK", message: "Checking api health" });
});
exports.default = app;
