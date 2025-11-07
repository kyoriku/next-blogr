import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
    orderBy: { id: 'desc' },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Public Feed
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Discover stories from our community
          </p>
        </div>

        {/* Posts list */}
        {props.feed.length > 0 ? (
          <div className="space-y-4">
            {props.feed.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-slate-400 dark:text-slate-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No posts yet</h3>
              <p className="text-slate-600 dark:text-slate-400">Be the first to create a post and share your story with the community.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Blog