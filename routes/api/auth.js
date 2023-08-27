const express = require('express');
const ctrl = require('../../controllers/auth');

const { validateBody, checkBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', checkBody, validateBody(schemas.registrationSchema), ctrl.register);

router.post('/login', checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
