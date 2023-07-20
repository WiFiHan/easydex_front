import { useEffect, useState } from "react";
import { DexBlock } from "../components/DexBlock";
import useDexList from "../data/dex";
import { getDexes, pullDexes, getUser } from "../apis/api";
import { BigBlock,SmallBlock } from "../components/Block";
import { useLocation, useParams } from "react-router-dom";

const BigBlockPage = () => {

  //Component화 희망
  const dexes = useDexList();  
  const {blockid} = useParams();
  const dex = dexes.find((dexItem) => dexItem.id == blockid);

  const location = useLocation();
  const istag = location.state.istag;
  {istag ? console.log("태그에서 왔음") : console.log("다른데서 옴")};

  const handleChange = (e) => {};
  //className="grid grid-cols-4 px-10 mt-10"
  return (
    <div>
      This is BigblockPage
      <div>
        <BigBlock dex ={dex}/>
      </div>
    </div>
  );
};

export default BigBlockPage;