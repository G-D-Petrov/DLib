import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { Loading, LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from 'superjson';
import toast from "react-hot-toast";
import { useState } from "react";
import { type Book } from "@prisma/client";

const DeleteBook = (book:Book) => {
  const [id] = useState<string>(book.id.toString());
  const {mutate, isLoading } = api.books.deleteBookById.useMutation({
    onSuccess: (data: Book) => {
      toast.success(`${data.title} deleted successfully!`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return (
    <div className="mt-4">
      {!isLoading && <button
      className="w-full bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-red-800 transition duration-300"
      type="submit" onClick={(e) => {
          e.preventDefault();
          console.log(id);
          mutate({id});
      }}
      disabled={isLoading}>Delete book</button>}
      {isLoading && <div className="flex flex-col items-center"><Loading /></div>}
    </div>
  );
};

const ViewBookWizard = (book: Book) => {
  const [id] = useState<string>(book.id.toString());
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author);
  const [town, setTown] = useState<string>(book.town);
  const [address, setAddress] = useState<string>(book.address);

  const { mutate, isLoading } = api.books.updateBookById.useMutation({
    onSuccess: (data: Book) => {
      toast.success(`${data.title} updated successfully!`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  // const { deleteDoook, isLoadingDelete } = api.books.deleteBookById.useMutation({
  //   onSuccess: (data: any) => {
  //     toast.success(`${data.title} deleted successfully!`);
  //   },
  //   onError: (err: any) => {
  //     toast.error(err.message);
  //   }
  // });



  return (
    <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-100">Add a new book</h1>
        <form className="w-full max-w-sm mx-auto bg-black p-8 rounded-md shadow-md">
        <div className="mb-4">
            <label className="block text-slate-400 text-sm font-bold mb-2" >Title</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className="block text-slate-400 text-sm font-bold mb-2" >Author</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" value={author} onChange={(e) => setAuthor(e.target.value)}  />
        </div>
        <div className="mb-4">
            <label className="block text-slate-400 text-sm font-bold mb-2" >Town</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" value={town} onChange={(e) => setTown(e.target.value)}  />
        </div>
        <div className="mb-4">
            <label className="block text-slate-400 text-sm font-bold mb-2">Address</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" value={address} onChange={(e) => setAddress(e.target.value)}  />
        </div>
        {!isLoading && <button
            className="w-full bg-zinc-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-zinc-800 transition duration-300"
            type="submit" onClick={(e) => {
                e.preventDefault();
                console.log(title, author, town, address);
                mutate({id, title, author, town, address});
            }}
            disabled={isLoading}>Update book</button>}
        {isLoading && <div className="flex flex-col items-center"><Loading /></div>}
        <DeleteBook {...book} />
        </form>
    </div>
    );
};


export const getStaticProps: GetStaticProps = async (context)  => {
  const id = context.params?.id;

  if (typeof id !== "string") {
    throw new Error("id is not a string");
  }

  const bookId = id;

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      userId: null,
    },
    transformer: superjson, // optional - adds superjson serialization
  });

  await ssg.books.getBookById.prefetch({ id: bookId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      bookId
    },
  };
};

const SingleBookPage: NextPage<{ bookId: string }> = ({ bookId }) => { 
    const {data, isLoading} = api.books.getBookById.useQuery({
      id: bookId
    });

    if ( isLoading ) return <LoadingPage />;

    if ( !data ) return <div>Something went wrong...</div>;

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <ViewBookWizard {...data} />
    </>
  );
};

export const getStaticPaths = () => {

  return { paths: [], fallback: "blocking" };
};


export default SingleBookPage;
