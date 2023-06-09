import { type Book } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { Loading } from "./loading";
import { useRouter } from 'next/navigation';

const DeleteModal = (book:Book) => {
    const [id] = useState<string>(book.id.toString());
    const router = useRouter()

    const {mutate, isLoading } = api.books.deleteBookById.useMutation({
      onSuccess: (data: Book) => {
        toast.success(`${data.title} deleted successfully!`);
        router.push('/books');
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="mt-4">
            <button onClick={() => setShowModal(true)} className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">
            Delete
        </button>
        
        {showModal && <div tabIndex={-1} id="defaultModal" className="absolute top-1/3 left-4 md:translate-x-1/3 md:translate-y-1/4 ml-auto mr-auto w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-screen">
                <div className="relative w-full max-w-xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Delete Item
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg  className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Are you sure that you want to delete this item?
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {!isLoading && <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(id);
                                mutate({id});
                            }}>Delete</button>}
                            {isLoading && <Loading />}
                            <button data-modal-hide="defaultModal" onClick={() => setShowModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default DeleteModal;