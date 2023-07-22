import { Link } from "react-router-dom";
import useDexList from "../../data/dex";
import { Tag } from "./tag";
import { useState, useEffect } from "react";
import ModalBasic from "./modalBasic";
import { watchDex, getDexes, getDexesAPI, pullDexes } from "../../apis/api";
import { getSessionStorage } from "../../utils/cookie";

import { Chart } from "./chart";

export const SmallBlock = ({ dex }) => {
  // 차트 제작
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>;
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  function getRandom(length) {
    return Math.floor(Math.random() * length);
  }


  var randomTag = [];
  console.log("before RandomTag");
  if (dex.tags.length) {
    //임시조치. 연관도 기준으로 오는 dex.tags와(자기자신 포함하므로 유의),
    //dex.tags 제외하고 randomTag로 한 놈만 뽑을 수 있도록!
    randomTag.push(dex.tags[1]);
    randomTag.push(getRandom(dex.tags.length));
    // while (randomTag[0] == randomTag[1]) {
    //   console.log('infinite loop');
    //   randomTag[1] = getRandom(dex.tags.length);
    // }
    // console.log(randomTag);
    return dex.invest ? (
      <div className="card w-[300px] h-[300px]  p-1 m-10  items-center justify-center bg-gradient-to-br rounded">
        <div className="smallblock relative flex flex-col bg-white ">
          <div className="px-2 py-1 flex justify-between">
            <div
              className="tooltip"
              data-tip="흰색 block은 투자지표이고 갈색 block은 경제지표입니다"
            >
              🙌
            </div>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-between">
            <div className="w-1/2 flex flex-col">
              <div className="flex flex-col justify-between">
                <Link
                  to={"/Bigblock/" + dex.id}
                  state={{ istag: false }}
                  className="btn btn-lg btn-ghost"
                >
                  {dex.title}
                </Link>
              </div>
              <p>{dex.value}</p>
            </div>
            <div className="flex-col justify-center">
              {randomTag.length ? (
                <>
                  <Tag id={randomTag[0]} dexid={dex.id} />
                  <br></br>
                  <Tag id={randomTag[1]} dexid={dex.id} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <img src="/assets/images/lion.jpeg" alt="오류" />
            <div>
              <canvas id="myChart"></canvas>
            </div>

          </div>
        </div>
      </div>
    ) : (
      <div className="card w-[300px] h-[300px] p-1 m-10 items-center justify-center bg-gradient-to-br rounded from-economy_tag/10">
        <div className="smallblock relative flex flex-col bg-white ">
          <div className="px-2 py-1 flex justify-between">
            <div
              className="tooltip"
              data-tip="흰색 block은 투자지표이고 갈색 block은 경제지표입니다"
            >
              🙌
            </div>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <Link
                  to={"/Bigblock/" + dex.id}
                  state={{ istag: false }}
                  className="btn btn-ghost btn-lg"
                >
                  {dex.title}
                </Link>
              </div>
              <p>{dex.value}</p>
            </div>
            <div className="flex-col">
              {randomTag.length ? (
                <>
                  <Tag id={randomTag[0]} dexid={dex.id} />
                  <br></br>
                  <Tag id={randomTag[1]} dexid={dex.id} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <img src="/assets/images/lion.jpeg" alt="오류" />
          </div>
        </div>
      </div>
    );
  }
};

export const BigBlock = ({ dex }, index) => {

  // console.log(dex.tags);
  // if (typeof dex.tags === 'string') {
  //   const dexTags = Object.keys(JSON.parse(dex.tags.replace(/'/g, '"'))).map(Number);
  //   dex.tags = dexTags;
  //   console.log(dex);
  // }

  const onClickWatch = () => {
    console.log(dex.id);
    watchDex(dex.id);
  };

  //taglist 만들어서 click시 연결 되도록
  //index는 이전에 클릭 된 개체의 id를 의미 dex는 Big block 내용에 들어올 dex 의미
  // index와 dex id가 같으면 이전과의 관계 필요 x

  // 이부분에 dexlist 가져오고 dex또한 필요
  // const {dexList, watchDexList} = useDexList();
  const dexList = getSessionStorage("cachedDexList");
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  var tagDexarr = [];

  // console.log(dex);
  dex.tags.map((id) => {
    // tagDexarr.push(dexList.find((dex) => dex.id === id));
    // console.log(id);
    tagDexarr.push(dexList.find((dex) => dex.id === id));
  });

  // 추후 tag인지 smallblcok에서 왔는지 구분할때 필요
  const fromhome = dex.id == index ? true : false;

  return (
    <div className="mainLayout">
      {dex.invest ? (
        <div className="self-center p-1 my-10 items-center justify-center bg-gradient-to-br rounded">
          <div className="bigblock relative flex flex-col bg-white">
            <div className="py-1 flex justify-between">

              <div
                className="tooltip"
                data-tip="흰색 block은 투자지표이고 갈색 block은 경제지표입니다"
              >
                🙌
              </div>
              <button className="btn btn-xs" onClick={onClickWatch}>
                ❤️
              </button>
            </div>
            <div className="flex flex-col justify-between">
              <Link
                to={"/Bigblock/" + dex.id}
                state={{ istag: false }}
                className="btn btn-ghost"
              >
                {dex.title}
              </Link>
              <div className="flex flex-col">
                {dex.tags.map((id) => (
                  <Tag id={id} dexid={dex.id} />
                ))}
              </div>

            </div>
            <div className="flex flex-row justify-between py-3">
              <div className="flex flex-col">
                <p>{dex.closing}</p>
                <div className="h-[300px]">
                  <p>graph</p>
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>{dex.description}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="self-center p-1 my-10 items-center justify-center bg-gradient-to-br rounded from-economy_tag/80">

          <div className="bigblock relative flex flex-col bg-white">
            <div className=" flex justify-between">
              <div
                className="tooltip"
                data-tip="흰색 block은 투자지표이고 갈색 block은 경제지표입니다"
              >
                🙌
              </div>
              <button className="btn btn-xs" onClick={onClickWatch}>
                ❤️
              </button>
            </div>
            <div className="flex flex-rcol justify-between p-5">
              <Link
                to={"/Bigblock/" + dex.id}
                state={{ istag: false }}
                className="btn btn-ghost"

              >
                {dex.title}
              </Link>
              <div className="flex flex-row">
                {dex.tags.map((id) => (
                  <Tag id={id} dexid={dex.id} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between py-3">
              <div className="flex flex-col">
                <p>{dex.closing}</p>
                <div className="h-[300px]">
                  <p>graph</p>
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>{dex.description}</div>
            </div>
          </div>
        </div>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">

        {tagDexarr.map((dex) => (
          <SmallBlock dex={dex} />
        ))}
      </div>
    </div>
  );
};
