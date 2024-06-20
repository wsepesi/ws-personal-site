import Link from "next/link"
import { RetroPhoto } from "@/components/retro-photo"
import SiteBase from "@/components/SiteBase"
import bridge from '../../photos/bridge.jpg'

const About = () => {
    return (
        <SiteBase title="About" description="william sepesi's personal website about page">
            <div className="flex flex-col-reverse md:flex-row items-center sm:items-start">
                <p className="sm:w-[30vw]">Proceed to <Link href="/about/courses" className="underline hover:italic">coursework</Link> or <Link href="/about/work" className="underline hover:italic">experience</Link></p>
                <div className="flex-1">
                    <RetroPhoto src={bridge} /> 
                </div>
            </div>
        </SiteBase>
    )
}

export default About