"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_js_1 = __importDefault(require("./api/v1/user.routes.js"));
const router = (0, express_1.Router)();
router.use('/users', user_routes_js_1.default);
exports.default = router;
