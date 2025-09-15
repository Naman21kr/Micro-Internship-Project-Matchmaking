
import express from 'express';
const router = express.Router();

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  await req.db.read();
  const projects = req.db.data.projects;
  res.json(projects);
});

// @route   GET api/projects/:id
// @desc    Get a single project
// @access  Public
router.get('/:id', async (req, res) => {
  await req.db.read();
  const project = req.db.data.projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ msg: 'Project not found' });
  }
  res.json(project);
});

export default router;
