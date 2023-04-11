import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";

// export const getStaticProps: GetStaticProps = async (context)  => {
//     const slug = context.params?.slug;
// };
    

const SingleBookPage: NextPage = () => { 
    const {data, isLoading} = api.books.getAll.useQuery();

    if ( isLoading ) return <LoadingPage />;

    if ( !data ) return <div>Something went wrong...</div>;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex justify-center h-screen">
        Single Post Page
      </main>
    </>
  );
};

export default SingleBookPage;
