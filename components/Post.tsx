import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    image: string | null;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  
  return (
    <article 
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className="card p-6 cursor-pointer hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all"
    >
      <div className="space-y-4">
        {/* Header with draft badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">{authorName}</span>
              {!post.published && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                    Draft
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Content preview */}
        <div className="prose prose-slate dark:prose-invert prose-sm max-w-none line-clamp-3">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        {/* Read more link */}
        <div className="pt-2">
          <span className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 inline-flex items-center gap-1">
            Read more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};

export default Post;