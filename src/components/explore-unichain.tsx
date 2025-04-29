// import { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import type { NextPage } from "next";
// import RotateIcon from "@icons/RotateIcon";
// import Counter from "@components/Counter";
// import { CardType, HistoryType, ResultType, SwipeType } from "types";
// import CARDS from "@data/cards";
// import Card from "@components/Card";
// import Head from "next/head";

import SwipeableStackCards from "./gesturs/swipe-card";
import { useQueryCommemesUnichain } from "@/hooks/use-query-commemes-core-dao";


export default function ExploreUnichain() {
  const {data:commemes,status,error,refetch} = useQueryCommemesUnichain(1301)
  console.log({error})
  return(
 <div className="w-full h-full flex justify-center items-center">
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the unichain Subgraph</div> : null}
      {/* <ExpandableCardDemo commemes={commemes ?? []} /> */}
      <SwipeableStackCards commemes={commemes ?? []} chainId={1301} refetch={refetch}/>
 </div>
);
};


