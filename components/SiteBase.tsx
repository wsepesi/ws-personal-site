import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import logo from "../public/favicon.ico"
import { usePathname } from "next/navigation"

const directory = {
    "/": {
        name: "home",
    },
    "/about": {
        name: "about",
    },
    "/blog": {
        name: "blog",
    },
}

interface PageProps {
    children: React.ReactNode,
    title: string,
}

const SiteBase = (props: PageProps) => {
    const location = usePathname() //.split("/")[1]
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
                    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
                    crossOrigin="anonymous"
                />
            </Head>
            <div className="flex flex-col sm:flex-row sm:pt-[10vh] sm:pl-[15vw] items-center sm:items-start">
                
                <div className="sm:min-w-[7vw] sm:pt-[7.5vh] flex flex-row justify-between sm:justify-start sm:flex-col sm:border border-1 border-black sm:mr-[3vw] sm:h-[30vh] w-[50vw] sm:w-auto mx-[3vw] sm:mx-0">
                    {Object.entries(directory).map(([path, { name }]) => {
                        const here = (path !== '/' && location.includes(path)) || location == path //`/${location}` === path
                        return (
                            <Link
                                key={path}
                                href={path}
                            >
                                <p className={`text-xl text-black ${here ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>{name}</p>
                            </Link>
                            
                        )}
                    )}
                </div>
                <div className="h-[95vh] w-[94vw] mx-[3vw] mb-[1vh] sm:mx-0 sm:my-0 sm:w-[60vw] sm:h-[80vh] border border-1 border-black overflow-y-auto">
                    <div className="px-5 pb-5 pt-2">
                        <h1 className="font-title py-2">{props.title}</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteBase