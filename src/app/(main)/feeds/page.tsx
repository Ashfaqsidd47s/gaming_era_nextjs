"use client"
import Post from '@/components/Post'
import PostBar from '@/components/PostBar'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import userStore from '@/store/userStore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface PostData {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  img: string;
  likes: string[]; // Array of user IDs who liked the post
  user: {
    name: string;
    username: string;
    profileImage: string | null; // User's profile image, could be null
  };
  _count: {
    comments: number; // Number of comments on the post
  };
}

export default function page() {
  const user = userStore((state) => state.user)
  const [isFetching, setIsFetching] = useState(false)
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const getPosts = async ()=> {
      try {
        setIsFetching(true)
        const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts")
        setPosts(res.data);
        setIsFetching(false)
      } catch (err) {
        setIsFetching(false)
      }
    }
    getPosts();
  }, [])
  

  return (
    <div className=' p-1 w-full flex flex-col gap-2'>
      <PostBar />
      {
        isFetching ? <PostSkeleton /> :
        posts.map((post) => (
          <Post 
            key={post.id}
            id={post.id}
            userId={post.userId}
            content={post.content}
            username={post.user.name}
            img={post.img}
            userImg={post.user.profileImage}
            postedAt={post.createdAt}
            likes={post.likes.length}
            comments={post._count.comments}
            isLiked={post.likes.includes(String(user?.id))}
           />
        ))
      }
    </div>
  )
}
