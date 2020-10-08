import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import Link from 'next/link'
import { useState, useEffect } from "react";

export default function Posts({posts: serverPosts}) {

  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const response = await fetch('http://localhost:9000/posts')
      const data = await response.json()
      setPosts(data)
    }

    if (!serverPosts) {
      load()
    }

  }, [])

  if (!posts) {
    return (
      <MainLayout>
        <p>
          Loading...
        </p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>NextJS</title>
      </Head>
      <h1>Posts Page</h1>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/post/[id]`} as={`/post/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
    </MainLayout>
  );
}

Posts.getInitialProps = async ({req}) => {
  if (!req) {
    return {
      posts:null
    }
  }
  
  const response = await fetch("http://localhost:9000/posts");
  const posts = await response.json();
  return {
    posts
  }
};
