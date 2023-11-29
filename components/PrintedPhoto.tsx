import Image from 'next/image'
import bridge from '../photos/bridge.jpg'

const PrintedPhoto = () => {
    // white background (cream slightly), 3:2 with 10% of the space of the component as inner margin
    return (
        // <div className="bg-[#f5f5f5] w-[30vw] h-[20vw] p-[2vw] pb-[10vh]">
            // <Image className="w-full h-full" alt="test" src={bridge} width={300} height={100}/>
            <Image className="w-[30vw] h-[20vw]" alt="test" src={bridge} width={300} height={100}/>
        // </div>
    )
}

export default PrintedPhoto