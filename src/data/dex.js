import { useEffect, useState } from 'react';
import { getDexes, pullDexes, pullDexHistory, updateDexWithTag } from '../apis/api';
import { getCookie, setSessionStorage, getSessionStorage } from '../utils/cookie';

const useDexList = () => {
  const [cachedDexList, setCachedDexList] = useState([]);
  const [cachedWatchDexList, setCachedWatchDexList] = useState([]);
  const [isUser, setIsUser] = useState('');

  useEffect(() => {

    const updateData = async (firstDexList) => {
      if (!firstDexList || firstDexList.length === 0) {
        await pullDexes();
        const secondDexList = await getDexes();

        if (!secondDexList.some((dex) => dex.values === null)) {
          const tagUpdateList = secondDexList.filter(item => item.values !== null && item.isInvest);
          const jsonObject = {
            indices: tagUpdateList
              .map(item => String(item.id))
          };
          await Promise.all(
            tagUpdateList.map(async function (data) {
              try {
                updateDexWithTag(data.id, jsonObject);
              } catch (error) {
                //randomTag 할당
              }
            })
          );
        }
      }
    }

    const fetchData = async () => {
      try {
        // 최초 접속 시에는 localStorage에서 dexList를 불러옵니다.
        const cachedDexes = getSessionStorage('cachedDexList');
        if (cachedDexes && cachedDexes.length != 0) {
          setCachedDexList(cachedDexes);
        } else {
          const firstDexList = await getDexes();
          await updateData(firstDexList);
          const dexes = await getDexes();
          setCachedDexList(dexes);
          
          // 최초로 받아온 dexList를 localStorage에 저장합니다.
        }
      } catch (error) {
        console.error('지표 데이터를 가져오는 도중 오류가 발생했습니다:', error);
      }
    };



    fetchData();
  }, []);

  return cachedDexList;
};

export default useDexList;


