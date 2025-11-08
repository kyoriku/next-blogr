import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import Layout from '../../../components/Layout';
import Router from 'next/router';
import prisma from '../../../lib/prisma';
import { authOptions } from '../../api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  // Check if post exists and belongs to the user
  if (!post || post.author?.email !== session.user?.email) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      },
    },
  };
};

type Props = {
  post: {
    id: string;
    title: string;
    content: string;
    published: boolean;
  };
};

const EditPost: React.FC<Props> = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const body = { title, content };
      await fetch(`/api/post/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push(`/p/${post.id}`);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Edit Post
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Update your story
          </p>
        </div>

        <div className="card p-4 md:p-6">
          <form onSubmit={submitData} className="space-y-6">
            {/* Title input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                value={title}
                className="w-full px-4 py-2.5 text-base bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                required
              />
            </div>

            {/* Content textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Content
                <span className="text-slate-500 dark:text-slate-400 font-normal ml-2">(Markdown supported)</span>
              </label>
              <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content here..."
                rows={16}
                value={content}
                className="w-full px-4 py-2.5 text-base bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-y font-mono leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
                required
              />
            </div>

            {/* Markdown helper */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-4">
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">Markdown Tips</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-950 px-2 py-1 rounded font-mono text-xs border border-slate-200 dark:border-slate-800">**bold**</code>
                  <span>for <strong>bold</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-950 px-2 py-1 rounded font-mono text-xs border border-slate-200 dark:border-slate-800">*italic*</code>
                  <span>for <em>italic</em></span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-950 px-2 py-1 rounded font-mono text-xs border border-slate-200 dark:border-slate-800"># Heading</code>
                  <span>for headings</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-950 px-2 py-1 rounded font-mono text-xs border border-slate-200 dark:border-slate-800">[link](url)</code>
                  <span>for links</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => Router.push(`/p/${post.id}`)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!content || !title || isSubmitting}
                className="btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-md p-4 md:p-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Editing your post</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {post.published 
                  ? 'Changes will be reflected immediately for all readers.' 
                  : 'Your changes will be saved to your draft. You can publish it when you\'re ready.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditPost;