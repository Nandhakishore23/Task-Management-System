const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createGroup,
    getGroups,
    getGroup,
    addMember,
    removeMember
} = require('../controllers/groupController');

router.post('/', auth, createGroup);
router.get('/', auth, getGroups);
router.get('/:id', auth, getGroup);
router.post('/:id/add-member', auth, addMember);
router.post('/:id/remove-member', auth, removeMember);

module.exports = router;
