import { type NextPage } from "next";
import Link from "next/link";
import { LoadingPage } from "~/components/loading";
import { PageLayout } from "~/components/page_layout";

import { api } from "~/utils/api";

const Feed = () => {
    const {data, isLoading} = api.books.getAll.useQuery();
  
    if ( isLoading ) return <LoadingPage />;
  
    if ( !data ) return <div>Something went wrong...</div>;
  
    return (
      <div className="flex flex-col">
        {data?.map((book) => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <div className="border border-slate-400 rounded-lg p-4 flex mb-1 text-slate-300">
            <div className="flex flex-col">
                <div className="flex">
                    <div className="font-bold">Title:</div>
                    <div className="ml-2">{book.title}</div>

                    <div className="font-bold ml-4">Author:</div>
                    <div className="ml-2">{book.author}</div>
                    
                    <div className="font-bold ml-4">Town:</div>
                    <div className="ml-2">{book.town}</div>

                    <div className="font-bold ml-4">Address:</div>
                    <div className="ml-2">{book.address}</div>
                </div>
            </div>
            </div>
        </Link>
        ))}
      </div>
    );
  };

const Books: NextPage = () => {
    return (
        <PageLayout>
            <Feed />
        </PageLayout>
    );
};

export default Books;