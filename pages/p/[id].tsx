import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-teal-200 dark:border-teal-900 border-t-teal-600 dark:border-t-teal-400 rounded-full animate-spin"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Post content */}
        <article className="card p-8 md:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight flex-1">
                {props.title}
              </h1>
              
              {!props.published && (
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Draft
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
  {props.author?.image ? (
    <img
      src={props.author.image}
      alt={props.author.name || 'Author avatar'}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
      {props.author?.name?.charAt(0).toUpperCase() || 'U'}
    </div>
  )}
  <div>
    <div className="font-medium text-slate-900 dark:text-white">
      {props.author?.name || 'Unknown author'}
    </div>
    <div className="text-xs">Author</div>
  </div>
</div>

          </header>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
            <ReactMarkdown>{props.content}</ReactMarkdown>
          </div>
        </article>

        {/* Action buttons */}
        {userHasValidSession && postBelongsToUser && (
          <div className="mt-6 card p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Post Actions</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Manage your post</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
  {!props.published && (
    <button 
      onClick={() => publishPost(props.id)}
      className="btn-primary cursor-pointer"
    >
      <span className="flex items-center gap-1.5">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Publish
      </span>
    </button>
  )}
  
  <button 
    onClick={() => Router.push(`/p/edit/${props.id}`)}
    className="btn-secondary cursor-pointer"
  >
    <span className="flex items-center gap-1.5">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      Edit
    </span>
  </button>

  <button 
    onClick={() => {
      if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        deletePost(props.id);
      }
    }}
    className="btn-danger cursor-pointer"
  >
    <span className="flex items-center gap-1.5">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete
    </span>
  </button>
</div>

            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => Router.back()}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Post;