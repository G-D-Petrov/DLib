import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavBar from "~/components/navbar";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;
