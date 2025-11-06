import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      await Router.push('/drafts');
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
            Create New Post
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Share your story with the community
          </p>
        </div>

        <div className="card p-8">
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
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-y font-mono leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
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
                onClick={() => Router.push('/')}
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
                    Creating...
                  </span>
                ) : (
                  'Create Draft'
                )}
              </button>

            </div>
          </form>
        </div>

        {/* Info card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-md p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Your post will be saved as a draft</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">You can publish it later from your drafts page. Only you can see your drafts until published.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Draft;