import React from 'react'
import ghostApi from '../api/ghost-api'
import { BlogTitle, Main, Container } from ".."
import { InferGetServerSidePropsType } from 'next'
import { GhostAPI, PostOrPage } from '@tryghost/content-api';
import Link from 'next/link'

type GhostPostProps = {posts: PostOrPage[]}
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

export async function getPosts(): Promise<PostOrPage[]> {
  return await ghostApi.posts
    .browse({
      limit: "all"
    })
    // .catch((err: unknown) => {
    //   console.error(err);
    // });
}

export const getStaticProps = async () => {
  const posts: PostOrPage[] = await getPosts()
  return {
    props: { posts }
  }
}
