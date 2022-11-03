"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConn_1 = require("./config/dbConn");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions_1 = require("./config/corsOptions");
const mongoose_1 = __importDefault(require("mongoose"));
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const logout_1 = __importDefault(require("./routes/logout"));
const tasks_1 = __importDefault(require("./routes/api/tasks"));
const credentials_1 = require("./middleware/credentials");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
// connect to db
(0, dbConn_1.connectDB)();
const app = (0, express_1.default)();
app.use(credentials_1.credentials);
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const message = {
    name: "Kenny",
    age: 22,
};
app.use("/register", register_1.default);
app.use("/login", auth_1.default);
app.use("/refresh", refresh_1.default);
app.use("/logout", logout_1.default);
app.use("/tasks", tasks_1.default);
app.get("/", (req, res) => {
    res.json(message);
});
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
mongoose_1.default.connection.once("open", () => console.log("Connected to Mongo DB"));
