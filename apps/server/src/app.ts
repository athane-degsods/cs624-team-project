import express, { Request, Response } from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js';

export const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: '🧗‍♂️ Bouldering API server is healthy and running!',
  });
});

// GET: Fetch all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST: Create a user
app.post('/api/users', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});