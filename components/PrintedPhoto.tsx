import Image from 'next/image'
import bridge from '../photos/bridge.jpg'

const PrintedPhoto = () => {
    // white background (cream slightly), 3:2 with 10% of the space of the component as inner margin
    return (
        // <div className="bg-[#f5f5f5] w-[30vw] h-[20vw] p-[2vw] pb-[10vh]">
            // <Image className="w-full h-full" alt="test" src={bridge} width={300} height={100}/>
            <Image className="w-[80vw] md:w-[30vw]" alt="test" src={bridge} width={300} height={100}/>
            
        // </div>
    )
}

// standard ratios (w, h): tall (6:5), square (1:1), wide (3:2) [entire card 5:2 h : h, like 1 : .7 h w]

export default PrintedPhoto