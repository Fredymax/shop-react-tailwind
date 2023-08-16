import React from "react";
import { ReactComponent as ArchiveBox } from "@/assets/archive-box.svg";

const NoProductsFound = () => {
  return (
    <div className="w-full text-center border py-10 p-x-6 text-gray-300">
      <ArchiveBox className="h-32 m-auto" />
      <h5 className="font-light">No products found</h5>
    </div>
  );
};

export default NoProductsFound;
