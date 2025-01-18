import React from 'react'
import {motion} from "framer-motion"

interface UserDataProp {
    image: string;
}



export default function TextingIcon({image} : UserDataProp) {
    const bounceTransition = {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
    };

    return (
    <div className="w-max max-w-[70%] flex gap-1">
        <div className={`${image? "block": "hidden"}  w-[35px] h-[35px] rounded-full bg-card flex items-center justify-center overflow-hidden`}>
            <img src={image == null || image == ""? "/avarar.png" : image} alt="" />
        </div>
        <div className=' flex items-end gap-1'>
            <motion.span 
                className=' w-3 h-3 rounded-full bg-primary '
                animate={{ y: [-10, 0] }}
                transition={{repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.6, delay: 0 }}
            ></motion.span>
            <motion.span 
                className=' w-3 h-3 rounded-full bg-primary '
                animate={{ y: [-10, 0] }}
                transition={{repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.6, delay: 0.3 }}
            ></motion.span>
            <motion.span 
                className=' w-3 h-3 rounded-full bg-primary '
                animate={{ y: [-10, 0] }}
                transition={{repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.6, delay: 0.6 }}
            ></motion.span>
        </div>
    </div>
  )
}
