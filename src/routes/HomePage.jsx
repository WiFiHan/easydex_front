import { useState, useEffect } from "react";
import { DexBlock } from "../components/DexBlock";
import useDexList from "../data/dex";
import { Link } from "react-router-dom";
import axios from "axios";
import { BigBlock, SmallBlock } from "../components/Block";
import { getDexes, pullDexes, getUser } from "../apis/api";
import { getCookie, getSessionStorage, setSessionStorage} from "../utils/cookie";
import EasyDEXlogo from "../assets/images/EasyDEX_logo.png";

const HomePage = () => {
  //백엔드에 저장되는 데이터로 수정
  // const dexList = useDexList();
  const { dexList, watchDexList } = useDexList();
  //dummy watchinDex
  const watchingDex = [dexList[1],dexList[2],dexList[3],dexList[4],dexList[5]];

  //로그인 여부를 판정하기 위해 사용
  const [customDex, setCustomDex] = useState(false);
  const handleCustom = () => {
    customDex ? setCustomDex(false) : setCustomDex(true);
  };
  const [isUser, setIsUser] = useState("");

  const handleDummyisUser = ()=>{
    isUser ? setIsUser(false) : setIsUser(true);
    if(isUser){
      setCustomDex(false);
    }
  }
  // const [watchingDex, setWatchingDex] = useState([]);
  
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


  useEffect(() => {}, [customDex]);

  return (  isUser ?(
    <div>
    <div className="mainLayout">
      <div>
        <Link to="/">
          <img src={EasyDEXlogo} className="mainPageLogo" />
        </Link>
      </div>
      <div className="flex flex-col justify-center">
    <div> <button onClick={() => handleDummyisUser()}>Dummy User Login Check button</button></div>
    <div><button onClick={() =>handleCustom()}>User custom dexes button</button></div>
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
      <Link to="/dexlist/">
            전체 지표 목록 보기
          </Link>
        {customDex?
        (
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {watchingDex.length === 0 ? (
          // dexList 배열의 길이가 0인 경우 로딩 화면 표시
          <p>Loading...</p>
          ) : (
            // dexList 배열의 길이가 1 이상인 경우 데이터를 매핑하여 보여줌
            watchingDex.map((dex) => <SmallBlock dex={dex} />)
          )}
        </div>)
   :(<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {dexList.length === 0 ? (
          // dexList 배열의 길이가 0인 경우 로딩 화면 표시
          <p>Loading...</p>
          ) : (
            // dexList 배열의 길이가 1 이상인 경우 데이터를 매핑하여 보여줌
            dexList.map((dex) => <SmallBlock dex={dex} />)
          )}
        </div>)}{" "}
      </div>
    </div>
  </div>):
  (
    //이 부분이 기존에 만들었던 HomePage Layout
    <div>
    <div className="mainLayout">
      <div>
        <Link to="/">
          <img src={EasyDEXlogo} className="mainPageLogo" />
        </Link>
      </div>
      <div className="flex flex-col justify-center">
    <div> <button onClick={() => handleDummyisUser()}>Dummy User Login Check button</button></div>
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
      <Link to="/dexlist/">
            전체 지표 목록 보기
          </Link>
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {dexList.length === 0 ? (
          // dexList 배열의 길이가 0인 경우 로딩 화면 표시
          <p>Loading...</p>
          ) : (
            // dexList 배열의 길이가 1 이상인 경우 데이터를 매핑하여 보여줌
            dexList.map((dex) => <SmallBlock dex={dex} />)
          )}

          </div>{" "}
        </div>{" "}
      </div>
    </div>))
};

export default HomePage;