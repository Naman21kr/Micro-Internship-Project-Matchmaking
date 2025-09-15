
import express from 'express';
const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  await req.db.read();
  const users = req.db.data.users;
  res.json(users);
});

export default router;
