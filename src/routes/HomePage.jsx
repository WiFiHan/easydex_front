import { useState, useEffect, uselocation } from "react";
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDexes, setSearchDexes] = useState([]);

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

  //className="grid grid-cols-4 px-10 mt-10"

  //set input onChange={handleChange}
  const handleChange = (e) => {
    const { value } = e.target;

    setSearchKeyword(value);
  };
  //set button onClick={onClickButton}
  // const [newDexes, setNewDexes] = useState([]);
  // const onClickButton = (e) => {
  //   console.log(searchKeyword);

  //   if (!(searchKeyword === "" || searchKeyword === " ")) {
  //     for (var i = 0; i < dexList.length; i++) {
  //       if (dexList[i]) {
  //         if (dexList[i].title.includes(searchKeyword)) {
  //           newDexes.push(dexList[i]);
  //           break;
  //         } else {
  //           for (var j = 0; j < 5; j++) {
  //             if (dexList[i].search_keyword[j]) {
  //               if (dexList[i].search_keyword[j].includes(searchKeyword)) {
  //                 setNewDexes(dexList[i]);
  //                 break;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // const newDexes =
  //   //   searchKeyword === "" || searchKeyword === " "
  //   //     ? []
  //   //     : dexList.filter((dex) => dex.title.includes(searchKeyword));
  //   setSearchDexes(newDexes);
  //   // console.log(searchDexes);
  //   console.log(newDexes);
  // };

  const [newDexes, setNewDexes] = useState([]);
  const onClickButton = (e) => {
    console.log(searchKeyword);

    let updatedDexes = []; // 일시적인 변수를 만들어서 여기에 결과를 저장하게 합니다.
    if (!(searchKeyword === "" || searchKeyword === " ")) {
      for (var i = 0; i < dexList.length; i++) {
        if (dexList[i]) {
          if (
            dexList[i].title.includes(searchKeyword) ||
            dexList[i].search_keyword.some((keyword) =>
              keyword.includes(searchKeyword)
            )
          ) {
            updatedDexes.push(dexList[i]); // 결과를 일시적인 변수에 추가합니다.
          }
        }
      }
    }
    setNewDexes(updatedDexes); // 상태를 한번에 업데이트 합니다.
    setSearchDexes(updatedDexes); // 필요에 따라 searchDexes도 업데이트 합니다.
    console.log(updatedDexes);
  };

  //For Getting News Summaries
  const [summaries, setSummaries] = useState("");
  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    const getNewsSummariesAPI = async () => {
      const newsArticles = await getNewsSummaries();
      setSummaries(newsArticles.summaries);
    };
    getNewsSummariesAPI();
  }, []);

  const jbSplit = summaries.split(/\r?\n/);
  const summaryTitles = [
    jbSplit[0],
    jbSplit[3],
    jbSplit[6],
    jbSplit[9],
    jbSplit[12],
  ];
  const summaryTexts = [
    jbSplit[1],
    jbSplit[4],
    jbSplit[7],
    jbSplit[10],
    jbSplit[13],
  ];

  for (var i = 0; i < 5; i++) {
    if (summaryTitles[i] && summaryTexts[i]) {
      console.log(typeof summaryTexts[i]);
      summaryTitles[i] = summaryTitles[i].substring(3);
      summaryTexts[i] = summaryTexts[i].substring(2);
    }
  }

  const [summaryOpen, setSummaryOpen] = useState("");

  const summaryCheck = (index) => {
    console.log(index);
    console.log(summaryOpen);
    if (summaryOpen === index) {
      setSummaryOpen("");
    } else {
      setSummaryOpen(index);
    }
  };

  const Summaries = () => {
    const summaryArray = [];
    for (let i = 0; i < 5; i++) {
      // 'var' 대신 'let' 사용
      if (summaryTitles[i] && summaryTexts[i]) {
        summaryArray.push(
          <div key={i}>
            <button // 'btn' 대신 'button' 사용
              className="btn mx-2"
              onClick={() => {
                summaryCheck(i);
              }}
            >
              {summaryTitles[i]}
            </button>
          </div>
        );
      }
    }
    return summaryArray;
  };

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
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item" onClick={onClickButton}>
              Search
            </button>
          </div>
        </div>
        <div>
          <p className="text-center font-bold text-s font-sans mt-2 text-gray-400">
            최신 경제 트렌드를 5개의 키워드로 확인하세요!<br></br>
            키워드를 클릭하면 해당 키워드에 대한 뉴스 요약을 확인할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-row mt-5">{Summaries()}</div>
        <div>
          {summaryOpen === "" ? null : (
            <>
              <div className="text-m font-bold font-sans grid h-10 w-100 card bg-base-200 rounded-box place-items-center justify-center px-10 my-3">
                {summaryTexts[summaryOpen]}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div class="flex justify-center items-center m-5">
            {dexList.length === 0 ? (
              // dexList 배열의 길이가 0인 경우 로딩 화면 표시

              <div>
                <span className="loading loading-dots loading-lg"></span>
                <p className="font-sans">Data Loading</p>
              </div>
            ) : //search가 될때? 검색된 결과 : watchList
            // dexList 배열의 길이가 1 이상이고 watchList가 null이 아닐 때만 watchList를 렌더링

            searchDexes.length === 0 ? (
              (console.log(searchDexes.length),
              !watchList || watchList.length === 0 ? (
                <div>
                  <div className="hero mt-5">
                    <div className="hero-content text-center">
                      <div className="max-w-lg">
                        <h1 className="text-5xl font-bold font-sans">
                          관심 종목이 비어있어요!
                        </h1>
                        <p className="py-6">
                          EasyDEX 에서는 관심 종목을 등록하고,
                          <br />
                          관심 종목의 지표를 한 눈에 확인할 수 있어요.
                          <br />
                          전체 지표를 보러 가볼까요?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                  {watchList.map((dex) => (
                    <SmallBlock dex={dex} user={user} />
                  ))}
                </div>
              ))
            ) : (
              <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {searchDexes.map((dex) => (
                  <SmallBlock dex={dex} user={user} />
                ))}
              </div>
            )}
          </div>
          <div className="btn btn-xl mb-10 btn-outline">
            <Link to="/dexlist/" state={{ user: user }}>
              전체 지표 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
