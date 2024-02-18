export const PostSkeleton = () => {
    return (
      <div
        role="status"
        className="m-4 pb-6 bg-white rounded shadow-2xl animate-pulse dark:border-gray-700 overflow-hidden"
      >
      <div className='w-[500px] h-40 bg-gray-200 dark:bg-gray-700'></div> 
        <div className="p-2 py-4 flex items-end justify-between">
        <div className="grid gap-2">
          <div className="h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 w-40 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-2.5 w-40 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
        </div>  
          <button className='bg-gray-200 dark:bg-gray-700 text-white px-10 py-3 rounded-md whitespace-nowrap'></button>
      </div>
      </div>
    );
  }; 