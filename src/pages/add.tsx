import { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "~/components/loading";
import { api } from "~/utils/api";

const Add: NextPage = () => {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [town, setTown] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const { mutate, isLoading: isPosting } = api.books.add.useMutation({
        onSuccess: (data) => {
            toast.success(`${data.title} added successfully!`);
        },
        onError: (err) => {
            toast.error(err.message);
        }
      });


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-slate-100">Add a new book</h1>
            <form className="w-full max-w-sm mx-auto bg-black p-8 rounded-md shadow-md">
            <div className="mb-4">
                <label className="block text-slate-400 text-sm font-bold mb-2" >Title</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" placeholder="John Doe and the Big Dragon" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-slate-400 text-sm font-bold mb-2" >Author</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" placeholder="John Doe" onChange={(e) => setAuthor(e.target.value)}  />
            </div>
            <div className="mb-4">
                <label className="block text-slate-400 text-sm font-bold mb-2" >Town</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" placeholder="Some Town" onChange={(e) => setTown(e.target.value)}  />
            </div>
            <div className="mb-4">
                <label className="block text-slate-400 text-sm font-bold mb-2">Address</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" placeholder="Example Street" onChange={(e) => setAddress(e.target.value)}  />
            </div>
            {!isPosting && <button
                className="w-full bg-zinc-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-zinc-800 transition duration-300"
                type="submit" onClick={(e) => {
                    e.preventDefault();
                    console.log(title, author, town, address);
                    mutate({title, author, town, address});
                }}
                disabled={isPosting}>Add book</button>}

                {isPosting && <div className="flex items-center"><Loading /></div>}
            </form>
        </div>
        );
};

export default Add;