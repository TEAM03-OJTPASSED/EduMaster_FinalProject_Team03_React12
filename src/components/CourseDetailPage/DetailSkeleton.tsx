const DetailSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 relative font-exo">
      <div className="flex -mx-[8vw] bg-orange-50 p-10 gap-4">
        <div className="lg:w-2/3 gap-4 animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="bg-gradient h-12 w-full rounded px-2"></div>
            <div className="h-6 w-full rounded bg-gray-300 px-2"></div>
            <div className="h-6 w-full rounded bg-gray-300 px-2"></div>
            <div className="h-6 w-1/3 rounded bg-gray-300 px-2"></div>
            <div className="h-6 w-1/2 rounded bg-gray-300 px-2"></div>
            <div className="bg-gradient h-16 w-1/5 rounded px-2 mt-4"></div>
          </div>
        </div>
        <div className="lg:flex hidden w-1/3 gap-4 animate-pulse">
          <div className="h-full w-full bg-gray-300 rounded px-2"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 -mx-[8vw] px-10 pb-10">
        <div className="flex flex-col gap-4 animate-pulse items-center">
          <div className="loader"></div>
          <div className="h-6 w-1/3 rounded bg-gray-300"></div>
          <div className="h-6 w-1/2 rounded bg-gray-300"></div>
          <div className="h-6 w-1/2 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
