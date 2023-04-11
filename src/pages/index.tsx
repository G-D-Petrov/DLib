import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";
import NavBar from "~/components/navbar";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  return (
    <>
      <NavBar />
      {user.isSignedIn && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-top">
            <h1 className="text-6xl font-bold text-red-200">Welcome to DLib!</h1>
            <br />
            <div className="text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
              <Link href={"/add"} >Add a new book</Link>
            </div>
            <br />
            <div className="text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
              <Link href={"/books"} >View books</Link>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
