import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from "@emotion/styled"

export const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  padding: 5rem 0;
  color: salmon;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BlogTitle = styled.h1`
  margin: 0;
  color: cornflowerblue;
  line-height: 1.15;
  font-size: 2rem;
`;

const title: string = "Next + typescript"

export default function Home() {
  return (
    <Container className={styles.container}>
      <Head>
        <BlogTitle>{title}</BlogTitle>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main className={styles.main}>
        hoowdy
      </Main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Container>
  )
}
