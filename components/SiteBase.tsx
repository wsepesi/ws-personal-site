'use client'

import { TEMPLATE, fullName, siteTitle } from "@/lib/content"
import useIsMobile from "@/lib/hooks"
import { lower } from "@/lib/utils"

import Link from "next/link"
// @ts-ignore
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { ScrollProgressBar } from "./ScrollProgressBar"

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
    "/contact": {
        name: "contact",
    },
}

interface PageProps {
    children: React.ReactNode,
    title: string,
    description?: string,
    showScrollProgress?: boolean
}

const SiteBase = (props: PageProps) => {
    const isMobile = useIsMobile(640)
    const location = usePathname()
    const [isHovering, setIsHovering] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        if (isMobile) return
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        if (isMobile) return
        setIsHovering(false)
    }

    const isHome = props.title === lower(siteTitle)

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:pt-[7vh] sm:pl-[9.5vw] 2xl:pl-[15vw] px-[3vw] sm:pr-0 items-center sm:items-start">
                <div className="sm:min-w-[7vw] w-[50vw] 2xl:w-[6vw] 2xl:min-w-0 mx-[3vw] sm:py-[7.5vh] flex flex-row gap-x-4 sm:gap-0 justify-between sm:justify-start sm:flex-col sm:border border-1 border-black sm:mr-[3vw] sm:w-[7.5vw]  sm:mx-0">
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
                                        <Link href="/about/work">
                                                <p className={`text-xl text-black ${location.includes("work") ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>work</p>
                                        </Link>
                                        <Link href="/about/courses">
                                                <p className={`text-xl text-black ${location.includes("courses") ? "font-black" : "font-medium"} hover:font-black sm:mx-5`}>courses</p>
                                        </Link>
                                    </div>
                                )}
                           
                            </div>
                        )
                    }
                    )}
                </div>
                <div className={`${TEMPLATE ? "h-[calc(90dvh)]" : "h-[calc(95dvh)]"} w-full mx-[3vw] mb-[1vh] sm:mx-0 sm:my-0 sm:w-[60vw] 2xl:min-w-[50vw] 2xl:w-[60vw] sm:h-[85vh] border border-1 border-black min-w-0 sm:min-w-[70vw]`}>                    
                    <div className={`pb-5 pt-2 ${isHome ? "px-5" : "px-5"} flex flex-col h-full`}>                         
                        <h1 className="font-title pt-2 md:pt-2 md:pb-0 self-center md:self-start text-center md:text-start">{props.title}</h1>                         
                        <div ref={scrollContainerRef} className="flex-grow min-h-0 overflow-y-auto">
                            {props.showScrollProgress && <ScrollProgressBar containerRef={scrollContainerRef} />}
                            {props.children}
                        </div>
                    </div>                 
                </div>
                {TEMPLATE && (
                    <>
                        <div className="w-full text-center sm:hidden">
                            <p className="text-xs pt-2">
                                Built with <Link href="https://github.com/wsepesi/ws-personal-site" className="underline hover:italic">[dot] computer</Link>
                            </p>
                        </div>
                        <div className="hidden sm:block fixed bottom-0 left-0 w-full h-[20vh]">
                            <p className="text-xs absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Built with <Link href="https://github.com/wsepesi/ws-personal-site" className="underline hover:italic">[dot] computer</Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SiteBase