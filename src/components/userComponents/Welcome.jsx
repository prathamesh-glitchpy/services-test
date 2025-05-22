import React from 'react'
import Card from '../common/Card';
import Button from '../common/Button';
const user = "User";

const Welcome = () => {
  return (
	<Card>
        <div className="flex flex-col justify-between h-auto sm:h-72">
          <div className="p-4 sm:p-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">Welcome, {user}</h1>
            <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-200">Your financial journey is looking good today!</p>
          </div>
          <div className="flex flex-col sm:flex-row p-4 sm:p-6 justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
			  height='h-[45px] sm:h-[56px]'
			  width='w-full sm:w-[200px] md:w-[274px]'
              text="Export Report" 
              bgColor="#3A506B"
              hoverBgColor="#2D3F55"
			  rounded='rounded-[25px]'
              className="text-white text-lg sm:text-xl md:text-2xl" 
            />
            <Button 
			  height='h-[45px] sm:h-[56px]'
			  width='w-full sm:w-[200px] md:w-[274px]'
              text="+ Add Investment" 
              bgColor="#6FFFE9"
              hoverBgColor="#5aebe9"
			  rounded='rounded-[25px]'
              className="text-[#0B132B] text-lg sm:text-xl md:text-2xl" 
            />
          </div>
        </div>
      </Card>
  )
}

export default Welcome