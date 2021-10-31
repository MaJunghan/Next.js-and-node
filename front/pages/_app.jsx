import React from "react";
import Head from "next/head";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird!!!!</title>
    </Head>
    <Component />
  </>
);

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(NodeBird);
