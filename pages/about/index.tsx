import Link from "next/link"
import { RetroPhoto } from "@/components/retro-photo"
import SiteBase from "@/components/SiteBase"
import SEO from "@/components/SEO"
import bridge from '@/photos/bridge.jpg'
import { fullName, SITE_URL } from "@/lib/content"

const About = () => {
    return (
        <>
            <SEO
                title="About"
                description={`Learn more about ${fullName} - ML researcher and engineer with experience at Microsoft, Square, and various startups. Background in reinforcement learning and AI research.`}
                url={`${SITE_URL}/about`}
                keywords={['William Sepesi about', 'ML researcher background', 'machine learning engineer', 'Microsoft', 'Square', 'Washington University']}
            />
            <SiteBase title="About" description={`${fullName}'s personal website about page`}>
            <div className="flex flex-col-reverse md:flex-row items-center sm:items-start">
                <p className="sm:w-[30vw]">Proceed to <Link href="/about/courses" className="underline hover:italic">coursework</Link> or <Link href="/about/work" className="underline hover:italic">experience</Link></p>
                <div className="flex-1">
                    <RetroPhoto alt="William Sepesi photo" src={bridge} /> 
                </div>
            </div>
        </SiteBase>
        </>
    )
}

export default About