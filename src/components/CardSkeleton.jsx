import React from "react";

const CardSkeleton = ({ repeat = 4 }) => {
  return (
    <section className="grid gap-5 grid-cols-1 md:grid-cols-4">
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="w-full cursor-pointer overflow-hidden rounded-md shadow-lg">
            <div className="relative">
              <figure className="h-[200px]">
                <div className="card skeleton"></div>
              </figure>
            </div>
            <div className="flex items-center justify-between px-3 py-4 text-gray-700">
              <div className="flex h-[40px] flex-col gap-1">
                <div className="card skeleton h-full w-[100px] rounded"></div>
                <div className="card skeleton h-full w-[170px] rounded"></div>
              </div>
              <div className="card skeleton min-h-[40px] w-[100px] rounded"></div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default CardSkeleton;
