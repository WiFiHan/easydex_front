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
        if (secondDexList.some((dex) => dex.tags === null)) {
          const jsonObject = {
            indices: secondDexList.map(item => String(item.id))
          };
    
          // Pull all dex history first
          await Promise.all(
            secondDexList.map(async function (data) {
              await pullDexHistory(data.id, jsonObject);
              console.log(`${data.id} values is ${data.values}`);
            })
          );
          


          // Now update all dex with tags
          await Promise.all(
            secondDexList.map(async function (data) {
              await updateDexWithTag(data.id, jsonObject);
            })
          );
        }
      }
    }

    const fetchData = async () => {
      try {
        // 최초 접속 시에는 localStorage에서 dexList를 불러옵니다.
        const cachedDexes = getSessionStorage('cachedDexList');
        if (cachedDexes) {
          setCachedDexList(cachedDexes);
        } else {
          const firstDexList = await getDexes();
          await updateData(firstDexList);
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

          setCachedDexList(dexes);
          // 최초로 받아온 dexList를 localStorage에 저장합니다.
          setSessionStorage('cachedDexList', dexes);
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
