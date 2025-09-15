
import express from 'express';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  await req.db.read();
  const userExists = req.db.data.users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = {
    id: req.db.data.users.length + 1,
    name,
    email,
    password,
    role
  };

  req.db.data.users.push(newUser);
  await req.db.write();

  res.json(newUser);
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  await req.db.read();
  const user = req.db.data.users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  if (user.password !== password) { 
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  res.json(user);
});

export default router;
