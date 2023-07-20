import { removeCookie } from "../utils/cookie";
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
  //Tags are converted from JSON to Array Here
  response.data.map(function (data) {
    const jsonTags = data.tags;
    const sortedKeys = Object.keys(jsonTags).sort(
      (a, b) => jsonTags[a] - jsonTags[b]
    );
    const tagKeys = sortedKeys.map(Number);
    data.tags = tagKeys;
  });
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

export const watchDex = async (dexId) => {
  const response = await instanceWithToken.post(
    `/dexmanager/${dexId}/userdex/`
  );
  if (response.status === 200 || response.status === 201) {
    // console.log(response);
    // window.location.reload();
  } else {
    console.log("[ERROR] error while deleting post");
  }
};
