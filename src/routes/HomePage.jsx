import { useState, useEffect } from "react";
import { DexBlock } from "../components/DexBlock";
import useDexList from "../data/dex";
import { Link } from "react-router-dom";
import axios from "axios";
import { BigBlock, SmallBlock } from "../components/Block";
import { getNewsSummaries, getUser } from "../apis/api";
import {
  getCookie,
  getSessionStorage,
  setSessionStorage,
} from "../utils/cookie";
import EasyDEXlogo from "../assets/images/EasyDEX_logo.png";

const HomePage = () => {
  //최초 전체 dexList를 호출
  const dexList = useDexList();
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        setIsUser(true);
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, [isUser]);

  const initWatchList = user ? getSessionStorage("watchingDex") : [];
  const watchList = initWatchList
    ? initWatchList
    : dexList.filter((dex) => dex.watching_users.includes(user.id) > 0);

  const [customDex, setCustomDex] = useState(false);
  const handleCustom = () => {
    customDex ? setCustomDex(false) : setCustomDex(true);
  };
  useEffect(() => {}, [customDex]);

  // //For Getting News Summaries
  // useEffect(() => {
  //   // access_token이 있으면 유저 정보 가져옴
  //   const getNewsSummariesAPI = async () => {
  //     const newsArticles = await getNewsSummaries();
  //     console.log(newsArticles);
  //   };
  //   getNewsSummariesAPI();

  // }, []);

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
          <Link to="/dexlist/">전체 지표 목록 보기</Link>
          <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {dexList.length === 0 ? (
              // dexList 배열의 길이가 0인 경우 로딩 화면 표시
              <p>Loading...</p>
            ) : // dexList 배열의 길이가 1 이상이고 watchList가 null이 아닐 때만 watchList를 렌더링
            !watchList ? (
              <p>No WatchList Yet...</p>
            ) : (
              watchList.map((dex) => <SmallBlock dex={dex} />)
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
