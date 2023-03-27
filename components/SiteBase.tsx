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
    const location = usePathname().split("/")[1]
    return (
        <div className="flex flex-row pt-[10vh] pl-[15vw] xs:pl-[5vw]">
            <div className="w-[7vw] pt-[7.5vh] flex flex-col border border-1 border-neutral-50 mr-[3vw] h-[30vh]"> 
            {/* className="w-[7vw] pt-[7.5vh] flex flex-col bg-[url('https://www.columbia.edu/~ey2172/gentle_10.jpg')] mr-[3vw] shadow-sm h-[30vh]" */}
                {Object.entries(directory).map(([path, { name }]) => {
                    const here = `/${location}` === path
                    return (
                        <Link
                            key={path}
                            href={path}
                        >
                            <p className={`text-xl text-neutral-200 ${here && "font-black text-white"} font-medium hover:font-black ml-5 hover:text-white`}>{name}</p>
                        </Link>
                        
                    )}
                )}
            </div>
            {/* <div className="bg-[url('https://www.columbia.edu/~ey2172/gentle_10.jpg')] min-w-[60vw] min-h-[80vh] shadow-sm"> */}
            <div className="border border-neutral-50 min-w-[60vw] min-h-[80vh] shadow-sm border-1">
                <div className="px-5 pb-5 pt-2">
                    <h1 className="font-title py-2 text-white">{props.title}</h1>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default SiteBase