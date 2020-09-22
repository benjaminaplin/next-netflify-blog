import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from 'next';

import Head from 'next/head';
import { Article, BlogPostExerpt, BlogPostImage } from '@components/Article';
import { BlogTitle } from '../index'
import ghostApi from '../api/ghost-api'
import { getPosts } from './index'
import Link from 'next/link'
import { GhostAPI, PostOrPage } from '@tryghost/content-api';

type GhostPost = {
  title: string;
  body: string;
  id: string;
}

type GhostPostProps = { post: GhostPost }

export default function BlogPost({
  post,
}: GhostPostProps) {
  const { title, body } = post;
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
      <BlogPostExerpt>{body}</BlogPostExerpt>
      {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
    </Article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: PostOrPage[]= await getPosts();
  console.log("getStaticPaths:GetStaticPaths -> posts", posts)

  const paths = posts.map((post: any ) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getSinglePost(postId: string): Promise<PostOrPage> {
  return await ghostApi.posts
    .read({
      id: postId
    })
    // .catch((err: unknown) => {
    //   console.error(err);
    // });
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

  const post: PostOrPage = await getSinglePost(`${params.id}`)

  return {
    props: {
      post,
    },
  };
};