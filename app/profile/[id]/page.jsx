"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
const UserProfile = ({ params }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const userName = useSearchParams().get("name");

  const router = useRouter();
    const userId = params.id;
    console.log(session.user.id)
    if(session?.user.id === userId) {
        router.push("/profile");
    }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);


  return (
    <Profile
      name={`${userName}`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s prompts and be inspired by the power of their imagination.`}
      data={posts}
    />
  );
};

export default UserProfile;
