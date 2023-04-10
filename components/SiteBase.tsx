import Link from "next/link"
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
        <div className="flex flex-col sm:flex-row sm:pt-[10vh] sm:pl-[15vw] items-center sm:items-start">
            <div className="sm:min-w-[7vw] sm:pt-[7.5vh] flex flex-row justify-between sm:justify-start sm:flex-col sm:border border-1 border-black sm:mr-[3vw] sm:h-[30vh] w-[50vw] sm:w-auto mx-[3vw] sm:mx-0"> 
            {/* className="w-[7vw] pt-[7.5vh] flex flex-col bg-[url('https://www.columbia.edu/~ey2172/gentle_10.jpg')] mr-[3vw] shadow-sm h-[30vh]" */}
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
            {/* <div className="bg-[url('https://www.columbia.edu/~ey2172/gentle_10.jpg')] min-w-[60vw] min-h-[80vh] shadow-sm"> */}
            <div className="h-[95vh] w-[94vw] mx-[3vw] mb-[1vh] sm:mx-0 sm:my-0 sm:w-[60vw] sm:h-[80vh] border border-1 border-black ">
                <div className="px-5 pb-5 pt-2">
                    <h1 className="font-title py-2">{props.title}</h1>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SiteBase