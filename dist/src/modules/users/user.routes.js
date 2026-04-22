"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const user_controller_1 = __importDefault(require("@/modules/users/user.controller"));
const user_validators_1 = require("@/modules/users/user.validators");
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.use(authMiddleware);
router.get('/me', user_controller_1.default.getUserMe);
router.get('/all', user_controller_1.default.getUsers);
router.get('/:id', user_controller_1.default.getUser);
router.post('/create', (0, validation_middleware_1.validateData)(user_validators_1.createUserSchema), user_controller_1.default.createUser);
router.put('/update/:id', user_controller_1.default.updateUser);
router.delete('/delete/:id', user_controller_1.default.deleteUser);
exports.default = router;
