import React from 'react'
import { BlogTitle, Main, Container } from ".."
import { InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export type Post = {
  userId: number;
  id: number;
  title: string,
  body: string
}

const Posts = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <Link href='/about/me'>
      howdy folks
      </Link>
        
    { posts.map( (post: Post) => {
      return ( 
        <Link href="/posts/[id]" key={post.id} as={`/posts/${post.id}`}>
            <BlogTitle>{post.title}</BlogTitle>
          </Link>
       )
     })}
    </Container>
  )
}

export default Posts

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts : Post[] = await response.json()
  return {
    props: {
      posts
    }
  }
}
