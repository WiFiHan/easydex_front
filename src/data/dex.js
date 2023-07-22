import { useEffect, useState } from 'react';
import { getDexes, pullDexes, getUser } from '../apis/api';
import { getCookie, setSessionStorage, getSessionStorage } from '../utils/cookie';

const useDexList = () => {
  const [cachedDexList, setCachedDexList] = useState([]);
  const [cachedWatchDexList, setCachedWatchDexList] = useState([]);
  const [isUser, setIsUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getCookie('access_token') ? true : false;
        setIsUser(user);

        // 최초 접속 시에는 localStorage에서 dexList를 불러옵니다.
        const cachedDexes = getSessionStorage('cachedDexList');

        if (cachedDexes) {
          setCachedDexList(cachedDexes);
        } else {
          await pullDexes();
          const dexes = await getDexes();
          dexes.map(function(dex) {
            console.log(dex.tags);
            if (typeof dex.tags === 'string') {
              console.log(dex.tags);
              const jsonTags = JSON.parse(dex.tags.replace(/'/g, '"'));
              const dexTags = Object.keys(jsonTags)
                                      .sort((a, b) => jsonTags[b] - jsonTags[a])
                                      .map(Number);
              dex.tags = dexTags;        
            }
          });

          setCachedDexList(dexes);
          // 최초로 받아온 dexList를 localStorage에 저장합니다.
          setSessionStorage('cachedDexList', dexes);
        }

        if (isUser) {
          const watchingDex = cachedDexList.filter((dex) => dex.watching_users.includes(user.id) > 0);
          setCachedWatchDexList(watchingDex);
        }
        // setSessionStorage('cachedWatchingDexList', cachedWatchDexList)

        // console.log(cachedDexList);

      } catch (error) {
        console.error('지표 데이터를 가져오는 도중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, []);

  return { dexList: cachedDexList, watchDexList: cachedWatchDexList };
};

export default useDexList;
