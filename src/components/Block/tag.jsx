import { useEffect } from "react";
import useDexList from "../../data/dex";
import { BigBlock, SmallBlock } from "./index";
import { Link } from "react-router-dom";

export const Tag = ({ id }, { dexid }) => {

  const dexList = useDexList();
  const tagid = id;
  const dex = dexList[id];
  return (
    dex && (
      <div className="badge badge-neutral">
        <Link to={"/Bigblock/" + tagid} state={{ istag: true }}>
          {dex.title}
        </Link>
      </div>
    )
  );
};
