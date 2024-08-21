export const FatCardLazyBox = () => {
  return (
    <>
      <div className="w-full p-2 bg-gray-100 rounded-2xl">
        <div className="w-full h-40 object-cover rounded-xl pointer-events-none bg-gray-200"></div>
        <div className="">
          <h2 className="text-lg font-semibold w-1/2 px-5 py-3 rounded-lg mt-2 bg-gray-300"></h2>
          <p className="text-xs py-5 bg-gray-300 mt-1 rounded-lg"></p>
          <p className="text-xs py-2 mt-1 bg-gray-300 rounded-lg w-1/3"></p>
        </div>
      </div>
    </>
  );
};
