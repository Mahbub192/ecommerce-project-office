import { useEffect, useState } from "react";
import Product from "./Product";
import PaginationControls from "../componants/PaginationControls";
import { paginate } from "../Utilities/Pagination";
import { useGetProductsQuery } from "../redux/api/api";
import dynamic from "next/dynamic";

const ProductPage = () => {
  const DynamicProduct = dynamic(() => import("./Product"), {
    loading: () => <h1 className="text-center">Loading...</h1>,
    ssr: false,
  });

  const [isLoading, setLoading] = useState(true);
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  // const {data,isError,error}=useGetProductsQuery();
  console.log(posts);

  useEffect(() => {
    fetch("api/server")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(posts, currentPage, pageSize);

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
            {paginatedPosts?.map((p) => (
              <DynamicProduct key={p.id} product={p}></DynamicProduct>
            ))}
          </div>
        )}
      </div>

      <PaginationControls
        itemsCount={posts.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></PaginationControls>
    </div>
  );
};
export default ProductPage;
