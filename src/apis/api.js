import { removeCookie } from "../utils/cookie";
import { instance, instanceWithToken } from "./axios";

// Account 관련 API들
export const signIn = async (data) => {
  try {
    const response = await instance.post("/account/signin/", data);
    if (response.status === 200) {
      window.location.href = "/";
    } else {
      console.log("Unknown Error");
    }
  } catch (error) {
    alert("아이디 또는 비밀번호를 확인하세요");
  }
};

export const signUp = async (data) => {
  try {
    const response = await instance.post("/account/signup/", data);
    if (response.status === 200) {
      window.location.href = "/";
    }
    return response;
  } catch (error) {
    alert("아이디는 4자 이상, 비밀번호는 8자 이상이어야 합니다");
  }
};

// GetUser API
// Edit, Delete 권한을 확인하거나, 프로필 페이지를 만들 때 사용하겠죠?
export const getUser = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
};

export const getUserProfile = async () => {
  const response = await instanceWithToken.get("/account/profile/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while getting profile");
  }
  return response.data;
};

export const editUserProfile = async (formData) => {
  const response = await instanceWithToken.patch("/account/profile/", formData);
  if (response.status === 200) {
    console.log("EDIT USER SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while editting profile");
  }
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const logOut = async (token) => {
  const response = await instanceWithToken.post("/account/logout/", {
    refresh: token,
  });
  if (response.status === 204) {
    console.log("REFRESH TOKEN SUCCESS");

    removeCookie("refresh_token");
    removeCookie("access_token");

    window.location.reload();
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

// Post 관련 API들
export const getDexes = async () => {
  const response = await instance.get("/dexmanager/");
  //Tag에 대한 형변환을 getDexes에서 한 번에 처리함
  response.data.map(
    function(data) {      
      const jsonTags = data.tags;
      const sortedKeys = Object.keys(jsonTags).sort((a, b) => jsonTags[a] - jsonTags[b]);
      const tagKeys = sortedKeys.map(Number);
      data.tags = tagKeys;
    });

  //전체 종가를 update하겠다.
  const keys = Object.keys(response.data);
  const idArray = keys.map(key => response.data[key].id);
  
  for (let i = 0; i < idArray.length; i++) {
    pullDexHistory(idArray[i]);
  }
  
  return response.data;
};

export const getDex = async (id) => {
  const response = await instance.get(`/dexmanager/${id}/`);
  return response.data;
};

export const pullDexes = async () => {
  const response = await instance.post("/dexmanager/");
  if (response.status === 200 || response.status === 201) {
    // console.log("POST SUCCESS");
  } else {
    // console.log("[ERROR] error while creating post");
  }
};

export const pullDexHistory = async (id) => {
  const response = await instance.post(`/dexmanager/${id}/`);
  if (response.status === 200 || response.status === 201) {
    // console.log("POST SUCCESS");
    // console.log(response);
  } else {
    console.log("[ERROR] error while creating post");
  }
};

// export const updatePost = async (id, data, navigate) => {
//   const response = await instanceWithToken.patch(`/post/${id}/`, data);
//   if (response.status === 200) {
//     console.log("POST UPDATE SUCCESS");
//     navigate(-1);
//   } else {
//     console.log("[ERROR] error while updating post");
//   }
// };

// export const deletePost = async (id, navigate) => {
//   const response = await instanceWithToken.delete(`/post/${id}/`);
//   if (response.status === 204) {
//     console.log("POST DELETE SUCCESS");
//     navigate("/");
//   } else {
//     console.log("[ERROR] error while deleting post");
//   }
// };

export const watchDex = async (dexId) => {
  const response = await instanceWithToken.post(`/dexmanager/${dexId}/userdex/`);
  if (response.status === 200 || response.status === 201) {
    console.log(response);
    // window.location.reload();
  } else {
    console.log("[ERROR] error while deleting post");
  }
};

// Tag 관련 API들
export const getTags = async () => {
  const response = await instance.get("/tag/");
  return response.data;
};

export const getTag = async (id) => {
  const response = await instance.get(`/tag/${id}/`);
  return response;
};

// export const createTag = async (data) => {
//   const response = await instanceWithToken.post("/tag/", data);
//   if (response.status === 201) {
//     console.log("TAG SUCCESS");
//   } else {
//     console.log("[ERROR] error while creating tag");
//   }
//   return response; // response 받아서 그 다음 처리
// };

// Comment 관련 API들
// export const getComments = async (postId) => {
//   const response = await instance.get(`/comment/?post=${postId}`);
//   return response.data;
// };

// export const createComment = async (data) => {
//   const response = await instanceWithToken.post("/comment/", data);
//   if (response.status === 201) {
//     console.log("COMMENT SUCCESS");
//     window.location.reload(); // 새로운 코멘트 생성시 새로고침으로 반영
//   } else {
//     console.log("[ERROR] error while creating comment");
//   }
// };

// export const updateComment = async (id, data) => {
//   const response = await instanceWithToken.patch(`/comment/${id}/`, data);
//   if (response.status === 200) {
//     console.log("COMMENT UPDATE SUCCESS");
//     window.location.reload();
//   } else {
//     console.log("[ERROR] error while updating comment");
//   }
// };

// export const deleteComment = async (id) => {
//   const response = await instanceWithToken.delete(`/comment/${id}/`);
//   if (response.status === 204) {
//     console.log("COMMENT DELETE SUCCESS");
//     window.location.reload();
//   } else {
//     console.log("[ERROR] error while deleting comment");
//   }
// };
