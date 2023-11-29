import SiteBase from "@/components/SiteBase"

const Months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October",
    "November",
    // "December"
]
const Embeds = [
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4DjH3hWc8i0hC8t5F9S6Wi?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4sarPGrkQMkMQMyrKFoKRT?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6hoTZekqa61FT2f7O2v04B?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/51J89E5l5A4rD7tjteMwoX?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7AmbiMPSoVhN3WBrXgwiLt?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4xaw85AE2k9oHQqsATap6G?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/678B5tJamoMNr7cMmguMcH?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7j1cB0dt5uaxsxBcogQBrK?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4gLLxGhF7hFOMS39SIMzbR?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/5047FY2nvipplpYyhnC987?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6DLcVYpURNEXA7lcGRrQT4?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
]

const EmbedsBlack = [
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4DjH3hWc8i0hC8t5F9S6Wi?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4sarPGrkQMkMQMyrKFoKRT?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6hoTZekqa61FT2f7O2v04B?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/51J89E5l5A4rD7tjteMwoX?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7AmbiMPSoVhN3WBrXgwiLt?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4xaw85AE2k9oHQqsATap6G?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/678B5tJamoMNr7cMmguMcH?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7j1cB0dt5uaxsxBcogQBrK?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4gLLxGhF7hFOMS39SIMzbR?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/5047FY2nvipplpYyhnC987?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
    `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6DLcVYpURNEXA7lcGRrQT4?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
]

const MonthToPlaylist = new Map(Months.map((month, i) => [month, EmbedsBlack[i]]))

const Music = () => {
    return (
       // <SiteBase title="Music">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mx-4 md:mx-20 my-4 md:my-15">
            {Array.from(MonthToPlaylist).map(([month, playlist]) => (
                <div key={month} className="flex flex-col items-center">
                    <p>{month}</p>
                    <div dangerouslySetInnerHTML={{ __html: playlist }} />
                </div>
            ))}
        </div>
        
        // </SiteBase>
    )
}

export default Music