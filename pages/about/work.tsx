import { RetroPhoto } from "@/components/retro-photo"
import SiteBase from "@/components/SiteBase"
import mountains from '../../photos/mountains.png'

const Work = () => {
    return (
        <SiteBase title="Work">
            <div className="flex flex-col-reverse md:flex-row">
                <p className="w-[30vw]">Coming soon, watch this space.</p>
                <div className="flex-1">
                <RetroPhoto src={mountains} /> 
                </div>
            </div>
        </SiteBase>
    )
}

export default Work