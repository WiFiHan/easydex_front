import { useState, useEffect } from "react";
import { DexBlock } from "../components/DexBlock";
import useDexList from "../data/dex";
import { Link } from "react-router-dom";
import axios from "axios";
import { BigBlock, SmallBlock } from "../components/Block";
import { getDexes, pullDexes, getUser } from "../apis/api";
import { getCookie, getSessionStorage, setSessionStorage } from "../utils/cookie";
import EasyDEXlogo from "../assets/images/EasyDEX_logo.png";

const HomePage = () => {
  
  //백엔드에 저장되는 데이터로 수정
  // const dexList = useDexList();
  const { dexList, watchDexList } = useDexList();

  //로그인 여부를 판정하기 위해 사용
  const [isUser, setIsUser] = useState("");
  const [watchingDex, setWatchingDex] = useState([]);
  // useEffect(() => {
  //   const user = getCookie("access_token") ? true : false;
  //   setIsUser(user);
  // }, []);

  // useEffect(() => {
  //   const getDexesAPI = async () => {
  //     await pullDexes();
  //     const dexes = await getDexes();
  //     setDexList(dexes);
  //     // console.log(dexes);
  useEffect(() => {
    const user = getCookie("access_token") ? true : false;
    setIsUser(user);
  }, []);

  // //여기서 dexList, watchDexList를 컨트롤중임... 로직 수정 필요
  // const [watchDex, setWatchList] = useState(getSessionStorage('cachedWatchingDexList'));
  // console.log(watchDex);
  // useEffect(() => {
  //   const watchDexAPI = async () => {
  //     //watchDex: dexes being practically rendered on the Home(Custom)Page
  //     //compare watchDex to the 'dexes', which is the whole list of the dexes saved in the backEnd DB
  //     if (isUser) {
  //       const user = await getUser();

  const [customDex, setCustomDex] = useState(false);
  const handleCustom = () => {
    customDex ? setCustomDex(false) : setCustomDex(true);
  };
  useEffect(() => {}, [customDex]);


  const handleChange = (e) => {};
  //className="grid grid-cols-4 px-10 mt-10"

  return (
    <div>
      <div className="mainLayout">
        <div>
          <Link to="/">
            <img src={EasyDEXlogo} className="mainPageLogo" />
          </Link>
        </div>

        <div className="join">
          <div>
            <div className="form-control">
              <input
                className="input main-input input-bordered join-item"
                placeholder="관심 있는 키워드를 입력하세요!"
              />
            </div>
          </div>
          <select className="select select-bordered join-item">
            <option disabled selected>
              Category
            </option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select>
          <div className="indicator">
            <button className="btn join-item">Search</button>
          </div>
        </div>
        <div>
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {dexes.map((dex) => (
              <SmallBlock dex={dex} />
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// // 이 아래는 사용자 custon dexlist를 위해서 따로 분류해서 작성중
// 그대로 둘 것

//   isUser ?(
//   <div>
//     <div className="mainLayout">
//       <div className="form-control">
//         <input
//           type="text"
//           placeholder="관심 있는 키워드를 검색해보세요!"
//           className="main-input input-bordered "
//         />
//       </div>
//       <div><button onClick={handleCustom()}>기본 dex와 사용자 설정 dex 변경 키워드를 넣기 위한 공간</button></div>
//       <div>
//       {customDex?
//       (
//         <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//           {watchingDex.map((dex) => (
//             <SmallBlock dex={dex} />
//           ))}
//         </div>)
//         :(
//         <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//       {dexes.map((dex) => (
//         <SmallBlock dex={dex} />
//       ))}
//         </div>)}
//         {" "}
//       </div>
//     </div>
//   </div> ):
//   (
//     <div>
//       <div className="mainLayout">
//         <div className="form-control">
//           <input
//             type="text"
//             placeholder="관심 있는 키워드를 검색해보세요!"
//             className="main-input input-bordered "
//           />
//         </div>
//         <div>
//           <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//             {dexes.map((dex) => (
//               <SmallBlock dex={dex} />
//             ))}
//           </div>{" "}
//         </div>
//       </div>
//     </div> );
