export const PostSkeleton = () => {
    return (
      <div
        role="status"
        className="m-4 pb-6 bg-white rounded shadow animate-pulse dark:border-gray-700 overflow-hidden"
      >
      
      <div className='w-[500px] h-40 bg-gray-200 dark:bg-gray-700'></div> 
        <div className="p-2 mt-20 flex items-end justify-between">
        <div className="">
          <div className="h-2 w-full px-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 w-full px-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 w-full px-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-2.5 w-full px-8 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
        </div>  
          <button className='bg-gray-200 dark:bg-gray-700 text-white px-10 py-3 rounded-md whitespace-nowrap'></button>
      </div>
      </div>
    );
  }; 