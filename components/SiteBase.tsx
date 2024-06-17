import Head from "next/head"
import Link from "next/link"
import useIsMobile from "@/lib/utils"
// @ts-ignore
import { usePathname } from "next/navigation"
import { useState } from "react"

const directory = {
    "/": {
        name: "home",
    },
    "/about": {
        name: "about",
    },
    "/writing": {
        name: "writing",
    },
}

interface PageProps {
    children: React.ReactNode,
    title: string,
}

const SiteBase = (props: PageProps) => {
    const isMobile = useIsMobile(640)
    const location = usePathname()
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        if (isMobile) return
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        if (isMobile) return
        setIsHovering(false)
    }
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
                    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
                    crossOrigin="anonymous"
                />
                <title>William [dot] Computer</title>
            </Head>
            <div className="flex flex-col sm:flex-row sm:pt-[10vh] sm:pl-[9.5vw] 2xl:pl-[15vw] px-[3vw] sm:pr-0 items-center sm:items-start">
                <div className="sm:min-w-[7vw] w-[50vw] 2xl:w-[6vw] 2xl:min-w-0 mx-[3vw] sm:py-[7.5vh] flex flex-row justify-between sm:justify-start sm:flex-col sm:border border-1 border-black sm:mr-[3vw] sm:w-[7.5vw]  sm:mx-0">
                    {Object.entries(directory).map(([path, { name }]) => {
                        const here = (path !== '/' && location.includes(path)) || location === path
                        return name !== "about" ? (
                            <Link
                                key={path}
                                href={path}
                            >
                                <p className={`text-xl text-black ${here ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>{name}</p>
                            </Link>
                            
                        ) : (
                            <div
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                key={name}
                            >
                            <Link
                                key={path}
                                href={path}
                                className="sm:pointer-events-none sm:inline-block"
                            >
                                <p 
                                    className={`text-xl text-black ${here ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}
                                    
                                >{name}</p>
                            </Link>
                                {  (isHovering || (here && !(isMobile))) && (
                                    <div className="pl-1">
                                        {/* TODO: refactor nicely if you add more of these */}
                                        <Link href="/about/courses">
                                                <p className={`text-xl text-black ${location.includes("courses") ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>courses</p>
                                        </Link>
                                        <Link href="/about/work">
                                                <p className={`text-xl text-black ${location.includes("work") ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>work</p>
                                        </Link>
                                    </div>
                                )}
                           
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="h-[calc(95dvh)] w-full mx-[3vw] mb-[1vh] sm:mx-0 sm:my-0 sm:w-[60vw] 2xl:min-w-[50vw] 2xl:w-[60vw] sm:h-[80vh] border border-1 border-black overflow-y-auto min-w-0 sm:min-w-[70vw]">
                    <div className="px-5 pb-5 pt-2">
                        <h1 className="font-title pt-2 md:py-2 self-center md:self-start text-center md:text-start">{props.title}</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteBase