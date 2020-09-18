import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';
import * as GhostContentAPI from '@tryghost/content-api';

import Head from 'next/head';
import { Article, BlogPostExerpt, BlogPostImage } from '@components/Article';
import { BlogTitle } from '../index'
import ghostApi from '../api/ghost-api'
import { getPosts } from './index'
import { GhostPost } from './index'
import Link from 'next/link'

export default function BlogPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, excerpt, html } = post;
  return (
    <Article>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
      </Head>
        {/* <BlogPostImage src="/entrance-to-prison.png" /> */}
      <Link href='/ghost-posts'>
        back to ghost posts
      </Link>
      <BlogTitle>{title}</BlogTitle>
      <BlogPostExerpt>{excerpt}</BlogPostExerpt>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  console.log("getStaticPaths:GetStaticPaths -> posts", posts)

  const paths = posts.map((post ) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getSinglePost(postId: string) {
  return await ghostApi.posts
    .read({
      id: postId
    })
    .catch((err: unknown) => {
      console.error(err);
    });
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const emptyPost = {
    title: 'GhostPost not found',
    body: '',
    id: 0,
    userId: 0,
  };

  if (!params?.id) {
    return {
      props: {
        post: emptyPost,
      },
    };
  }

  const post = await getSinglePost(`${params.id}`)

  return {
    props: {
      post,
    },
  };
};