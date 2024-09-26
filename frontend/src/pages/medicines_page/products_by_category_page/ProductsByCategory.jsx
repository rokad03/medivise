import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../../../constants";
import {
  SkeletonLoading,
  useLoading,
  Pagination,
} from "../../../import-export/ImportExport";

export default function ProductsByCategory() {
  const { id: category } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page
  const loading = useLoading(1000);

  useEffect(() => {
    // Filter products based on the category
    const filteredProducts = Products.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  }, [category]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Capitalize the first letter of the category name
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="space-y-6 my-20 max-w-7xl mx-auto px-4">
      <div className="text-center py-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark_theme">
          {formattedCategory}
        </h2>
      </div>

      {/* Product cards section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          // Render skeleton loading effect for each product card
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoading key={index} type="product" />
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="w-full h-auto flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-lg font-semibold text-dark_theme mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">{product.price}</p>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-center col-span-full text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          onPageChange={paginate}
        />
      </div>
    </section>
  );
}
