import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, content } = req.body;

  // Get the session using getServerSession (recommended for API routes)
  const session = await getServerSession(req, res, authOptions);

  console.log('Session:', session); // Debug log

  // Check if user is authenticated
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { 
          connect: { 
            email: session.user.email 
          } 
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
}