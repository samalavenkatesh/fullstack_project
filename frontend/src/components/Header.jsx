import React from 'react'

function Header() {
  return (
    <>
      <div className='flex w-screen mx-auto px-20 h-16 shadow-md fixed left-0 top-0 right-0 z-50 bg-white space-x-20'>
        {/* <div className='flex items-center text-center h-16 border-2 border-black px-20'> */}
        <div>
          <img src="/green.webp" alt=""  width={80}/>
        </div>
        <div className='flex justify-center items-center '>
            <ul className='text-xl text-gray-700 flex flex-row py-4 space-x-10 font-semibold cursor-pointer '>
                <li className=' hover:text-green-500 hover:font-semibold hover:scale-105 duration-100'>Home</li>
                <li className=' hover:text-green-500 hover:font-semibold hover:scale-105 duration-100'>Farmer</li>
                <li className=' hover:text-green-500 hover:font-semibold hover:scale-105 duration-100'>Buyer</li>
                <li className=' hover:text-green-500 hover:font-semibold hover:scale-105 duration-100'>Contacts</li>
                <li className=' hover:text-green-500 hover:font-semibold hover:scale-105 duration-100'>Services</li>
            </ul>
        </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default Header
