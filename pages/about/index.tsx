import { RetroPhoto } from "@/components/retro-photo"
import SiteBase from "@/components/SiteBase"
import me from '../../photos/me.png'

const About = () => {
    return (
        <SiteBase title="About">
           <div className="flex flex-col-reverse md:flex-row">
                <p>Coming soon, watch this space.</p>
                <div className="flex-1">
                {/* <RetroPhoto src={me} />  */}
                </div>
            </div>
        </SiteBase>
    )
}

export default About