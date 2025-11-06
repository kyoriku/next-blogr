import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id as string;

  // DELETE /api/post/:id
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Verify the post belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.email !== session.user?.email) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return res.json(deletedPost);
  }

  // PATCH /api/post/:id
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Verify the post belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.email !== session.user?.email) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    try {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title,
          content,
        },
      });

      return res.json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ error: 'Error updating post' });
    }
  }

  return res.status(405).json({ error: `The HTTP ${req.method} method is not supported at this route.` });
}