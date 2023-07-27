import { getSessionStorage, setSessionStorage, removeCookie } from "../utils/cookie";
import { instance, instanceWithToken } from "./axios";

// Account API
export const signIn = async (data) => {
  try {
    const response = await instance.post("/account/signin/", data);
    if (response.status === 200) {
      window.location.href = "/";
    } else {
      console.log("Unknown Error");
    }
  } catch (error) {
    alert("check ID or Password");
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
    alert("password must be longer than 8 characters");
  }
};

// GetUser API
// Edit, Delete 권
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

export const getDexes = async () => {
  
  const response = await instance.get("/dexmanager/");
  if (response.status === 200 || response.status === 201) {
  } else {
    console.log("[ERROR] error while getDexes");
  }
  return response.data;
};

export const getDex = async (id) => {
  const response = await instance.get(`/dexmanager/${id}/`);
  return response.data;
};

export const updateDexWithTag = async (id, jsonObject) => {
  console.log(`updateDexWithTag begins`)
  const response = await instance.put(`/dexmanager/${id}/`, jsonObject);
  const data = response.data;
  if (response.status === 200) {
    console.log("TAG UPDATE SUCCESS");
    // if (typeof  data.tags === 'string') {
    //   const dexTags = Object.keys(JSON.parse(data.tags.replace(/'/g, '"'))).map(Number);
    //   response.data.tags = dexTags;
    //   console.log(response.data);
    // }
  } else {
    console.log("[ERROR] error while updating tag");
  }
};

export const pullDexes = async () => {
  const response = await instance.post("/dexmanager/");
  if (response.status === 200 || response.status === 201) {
    // console.log("POST SUCCESS");
  } else {
    // console.log("[ERROR] error while creating post");
  }
};

export const pullDexHistory = async (id, jsonObject) => {
  console.log(`pullDexHistory begins`)
  const response = await instance.post(`/dexmanager/${id}/`);
  if (response.status === 200 || response.status === 201) {
    // updateDexWithTag(id, jsonObject);
    //change value type here

  } else {
    console.log("[ERROR] error while creating post");
  }
};

export const watchDex = async (dexId) => {
  const response = await instanceWithToken.post(`/dexmanager/${dexId}/userdex/`);
  console.log(response);

  if (response.status === 200 || response.status === 201) {
    const user = await getUser();
    const dexList = getSessionStorage('cachedDexList');
    // console.log(dexList);
    // const updateDex = await getDex(dexId);
    // dexList.forEach(dexItem => {
    //   if (dexItem.id === dexId) {
    //     console.log(`before assignment: ${dexItem.watching_users}`);
    //     dexItem.watching_users = updateDex.watching_users;
    //     console.log(`after assignment: ${dexItem.watching_users}`);
    //   }
    // });
    // console.log(dexList);

    const dexes = await getDexes();
    //Front에서 가공할 수 있게 data를 전처리하는 로직
    dexes.map(function(dex) {
      if (typeof dex.tags === 'string') {
        const jsonTags = JSON.parse(dex.tags.replace(/'/g, '"'));
        const dexTags = Object.keys(jsonTags)
                                .sort((a, b) => jsonTags[b] - jsonTags[a])
                                .map(Number);
        dex.tags = dexTags;        
      }});
    // 최초로 받아온 dexList를 localStorage에 저장합니다.

    const watchList = dexes.filter((dex) => dex.watching_users.includes(user.id) > 0);
    console.log(watchList);

    setSessionStorage('cachedDexList', dexes);
    setSessionStorage('watchingDex', watchList);

  } else {
    console.log("[ERROR] error while deleting post");
  }
};
