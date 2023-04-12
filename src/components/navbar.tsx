import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { LoadingPage } from "./loading";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
    const user = useUser();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if ( !user || !user.isLoaded ) return <LoadingPage />;

    console.log(user);

    return (
        <nav className="border-gray-200 bg-zinc-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Image width={48} height={48} src="/favicon.ico" className="mr-3" alt="DLib Logo" />
                    <span className="self-center text-3xl font-bold whitespace-nowrap text-slate-400">
                        DLib
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {!user.isSignedIn && <div className="text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
                        <SignInButton >Login</SignInButton>
                    </div>}
                    {!!user.isSignedIn && <UserButton />}
                    
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}  data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                                isMenuOpen ? 'block' : 'hidden'
                                }`} id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                    {user.isSignedIn && (
                        <li>
                            <Link href="/add" className="block py-2 pl-3 pr-4 text-slate-200 hover:bg-transparent hover:text-slate-600 md:p-0">Add Book</Link>
                        </li>
                    )}
                    {user.isSignedIn && (
                        <li>
                            <Link href="/books" className="block py-2 pl-3 pr-4 text-slate-200 hover:bg-transparent hover:text-slate-600 md:p-0">View Books</Link>
                        </li>
                    )}
                    <li>
                        <Link href="/about" className="block py-2 pl-3 pr-4 text-slate-200 hover:bg-transparent hover:text-slate-600 md:p-0">About</Link>
                    </li>
                    {/* <li>
                        <Link href="/pricing" className="block py-2 pl-3 pr-4 text-slate-200 hover:bg-transparent hover:text-slate-600 md:p-0">Pricing</Link>
                    </li> */}
                    <li>
                        <Link href="/contact" className="block py-2 pl-3 pr-4 text-slate-200 hover:bg-transparent hover:text-slate-600 md:p-0">Contact</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }