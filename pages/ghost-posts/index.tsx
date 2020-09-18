import ghostApi from '../api/ghost-api'
import React from 'react'
import { BlogTitle, Main, Container } from ".."
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export type GhostPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  html: string;
  excerpt: string;
}

const Posts = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <Link href='/about/me'>
      howdy folks
      </Link>
        
    { posts.map( (post: GhostPost) => {
      return ( 
        <Link href="/ghost-posts/[id]" key={post.id} as={`/ghost-posts/${post.id}`}>
            <BlogTitle>{post.title}</BlogTitle>
          </Link>
       )
     })}
    </Container>
  )
}

export default Posts

export async function getPosts() {
  return await ghostApi.posts
    .browse({
      limit: "all"
    })
    .catch((err: unknown) => {
      console.error(err);
    });
}

export const getStaticProps = async () => {
  const posts: GhostPost[] = await getPosts()
  return {
    props: {
      posts
    }
  }
}
