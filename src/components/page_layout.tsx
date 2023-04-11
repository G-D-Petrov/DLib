import { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:max-w-2xl">
                {props.children}
            </div>
        </main>
    );
};