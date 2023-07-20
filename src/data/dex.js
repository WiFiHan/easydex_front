import { useEffect, useState } from "react";
import { getDexes, pullDexHistory, pullDexes } from "../apis/api";
import { instance, instanceWithToken } from "../apis/axios";

// 캐싱된 dexList 변수
let cachedDexList = [];

const useDexList = () => {
  const [dexList, setDexList] = useState(cachedDexList);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/dexmanager/userdex/");
      const response_id = await instance.get("/dexmanager/");
      const keys = Object.keys(response_id.data);
      const idArray = keys.map((key) => response_id.data[key].id);
      if (response.data.is_empty) {
        await pullDexes();
        for (let i = 0; i < idArray.length; i++) {
          pullDexHistory(idArray[i]);
        }
      }
      try {
        // Check if cachedDexList is empty, if yes, fetch from backend and cache the result
        if (cachedDexList.length === 0) {
          const dexes = await getDexes();
          cachedDexList = dexes;
          setDexList(cachedDexList);
        }
      } catch (error) {
        console.error("Error fetching dex data:", error);
      }
    };

    fetchData();
  }, []);

  return dexList;
};

export default useDexList;

// import { useEffect, useState } from 'react';
// import { getDexes, pullDexes, getUser } from "../apis/api";
// import { getCookie } from "../utils/cookie";

// // 캐싱된 dexList 변수
// let cachedDexList = [];
// let cachedWatchDexList = []; // New cachedWatchDexList to store watchDex data

// const useDexList = () => {
//   const [dexList, setDexList] = useState(cachedDexList);
//   const [watchDexList, setWatchDexList] = useState(cachedWatchDexList); // State for watchDexList
//   const [isUser, setIsUser] = useState("");

//   useEffect(() => {
//     const user = getCookie("access_token") ? true : false;
//     setIsUser(user);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Check if cachedDexList is empty, if yes, fetch from backend and cache the result
//         if (cachedDexList.length === 0) {
//           await pullDexes();
//           const dexes = await getDexes();
//           cachedDexList = dexes;
//           setDexList(cachedDexList);
//         }

//         // Fetch watchDex data and cache it
//         // Assuming `isUser` is a boolean representing if a user is logged in
//         if (isUser && cachedWatchDexList.length === 0) {
//           const user = await getUser();
//           const watchingDex = dexList.filter(
//             (dex) => dex.watching_users.includes(user.id) > 0
//           );
//           cachedWatchDexList = watchingDex;
//           setWatchDexList(cachedWatchDexList);
//         }
//       } catch (error) {
//         console.error('Error fetching dex data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return { dexList, watchDexList }; // Return both dexList and watchDexList
// };

// export default useDexList;
