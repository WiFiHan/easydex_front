import { useState, useEffect } from "react";
import { DexBlock } from "../components/DexBlock";
import useDexList from "../data/dex";
import { BigBlock,SmallBlock } from "../components/Block/index";
import { Tag } from "../components/Block/tag";
import { Link } from "react-router-dom";
import { getSessionStorage, getCookie, setSessionStorage } from "../utils/cookie";
import { watchDex, getUser, getDex, getDexes } from "../apis/api";

const DexListPage = () => {
  // const dexList = useDexList();
  // const { dexList, watchDexList } = useDexList();
  const dexList = getSessionStorage('cachedDexList');
  const [isEdit, setIsEdit] = useState(false);
  const [isUser, setIsUser] = useState("");
  useEffect(() => {
    const user = getCookie("access_token") ? true : false;
    setIsUser(user);
  }, []);

  console.log(dexList)

  const handleChange = (e) => {};

  return (
    <div>
      <div class="flex flex-col dexlist-layout">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 dexlist">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Value
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dexList.map((dex)=>(
                    <DexInfo dex={dex} isUser={isUser}/>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexListPage;

const DexInfo = ({dex, isUser}) =>{
// 순서  1. id, 2. title, 3. closing, 4. tags
// 3번째 td에 5000을 추후 dex.closing으로 수정

console.log(dex);

const onClickWatch = async () => {
  watchDex(dex.id);
};



return (<>
  <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
  <td class="whitespace-nowrap px-6 py-4 font-medium">{dex.id}</td> 
  <td class="whitespace-nowrap px-6 py-4">                  
    <Link
      to={"/Bigblock/" + dex.id}
      state={{ istag: false }}>
      {dex.title}
    </Link>

  
    {isUser && (
      <button className="btn btn-xs" onClick={onClickWatch}>
        ❤️
      </button>
    )}

  </td>
  <td class="whitespace-nowrap px-6 py-4">5000</td>
  <td class="whitespace-nowrap px-6 py-4 flex flex-row">
    {dex.tags.map((id)=>(
    <Tag id={id} dexid={dex.id}/>
  ))}
  </td>
</tr></>
);};