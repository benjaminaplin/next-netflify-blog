import React from 'react'
import { Article } from '@components/Article'
import { useRouter } from "next/router"
import { BlogTitle, Main, Container } from ".."
import { InferGetServerSidePropsType } from 'next'

export type Post = {
  userId: number;
  id: number;
  title: string,
  body: string
}

const Posts = ({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) => {

  return (
    <Container>
      howdy folks
    { posts.map( (post: Post) => {
      return ( 
         <>
           <BlogTitle>{post.title}</BlogTitle>
           <Main>{post.body}</Main>
         </>
       )
     })}
    </Container>
  )
}

export default Posts

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const jsonResponse = await response.json()
  console.log("getStaticProps -> jsonResponse", jsonResponse)
  const posts : Post[] = jsonResponse
  return {
    props: {
      posts
    }
  }
}
