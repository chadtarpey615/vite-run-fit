import React from 'react'

const Footer = () => {
  return (
    <div>
     <footer className="fixed bottom-0 w-full">
      <div className='bg-gray-800 text-gray-400 py-0 '>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between ">
         <div className="text-sm my-2">
            <p className='m-2'>&copy; 2023 RunFit</p>
            <p className='m-2'>Created by Chad Tarpey</p>
         </div>
            <div className="text-sm">
                <p className='m-2'>Contact Us</p>
                <p className='m-2'>FAQs</p>
            </div>
        </div>
       </div>
      </div>
     </footer>
    </div>
  )
}

export default Footer
