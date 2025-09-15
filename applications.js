
import express from 'express';
const router = express.Router();

// @route   GET api/applications
// @desc    Get all applications
// @access  Public
router.get('/', async (req, res) => {
  await req.db.read();
  const applications = req.db.data.applications;
  res.json(applications);
});

export default router;
