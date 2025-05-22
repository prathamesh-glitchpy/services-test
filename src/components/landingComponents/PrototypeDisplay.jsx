import React from 'react'
import Prototype from '/src/assets/images/DisplayImages/Prototype.png'

const PrototypeDisplay = () => {
  return (
    <div className="relative max-h-[80%] flex justify-center items-center overflow-hidden w-full">
      <img
        src={Prototype}
        alt="Finance Mobile Preview"
        className="w-[80%] h-auto max-h-full object-contain mx-auto"
      />
    </div>
  )
}

export default PrototypeDisplay