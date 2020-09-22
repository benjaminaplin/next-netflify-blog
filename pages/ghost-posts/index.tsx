import React from 'react'
import ghostApi from '../api/ghost-api'
import { BlogTitle, Main, Container } from ".."
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
type GhostPost = {
  title: string;
  body: string;
  id: string;
}
type GhostPostProps = {posts: GhostPost[]}
const Posts = ({ posts }: GhostPostProps)  => {
  return (
    <Container>
      <Link href='/about/me'>
      howdy folks
      </Link>
        
    { posts.map( (post) => {
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
    props: { posts }
  }
}
