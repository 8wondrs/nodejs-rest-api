const express = require('express');
const ctrl = require('../../controllers/auth');

const { validateBody, checkBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', checkBody, validateBody(schemas.registrationSchema), ctrl.register);

router.post('/login', checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

module.exports = router;
