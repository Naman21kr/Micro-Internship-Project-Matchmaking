
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Create a new LowDB instance with the JSONFile adapter
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { users: [], projects: [], applications: [] });

// Read data from DB
await db.read();

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to attach db to req
app.use((req, res, next) => {
  req.db = db;
  next();
});


// Routes
import users from './routes/users.js';
import projects from './routes/projects.js';
import applications from './routes/applications.js';
import auth from './routes/auth.js';

app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/applications', applications);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
