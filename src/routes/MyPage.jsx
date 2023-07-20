import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/api";
import { MyPageForm } from "../components/Form";

const MyPage = () => {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getUserProfileAPI = async () => {
      const profile = await getUserProfile();
      setProfile({
        email: profile.user.email,
        username: profile.user.username,
      });

      setFormData({
        email: profile.user.email,
        username: profile.user.username,
      });
    };
    getUserProfileAPI();

    // const getPostsAPI = async () => {
    //   const postList = await getPosts();
    //   setPostList(postList);
    // };
    // getPostsAPI();
  }, []);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Page</h3>
      <MyPageForm
        profile={profile}
        formData={formData}
        setFormData={setFormData}
      />
      <h3 className="mt-12 font-bold text-4xl">My Posts</h3>
    </div>
  );
};

export default MyPage;
