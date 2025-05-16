import { Link } from "react-router";
import { useGetProductsQuery } from "../app/services/productApi";
import { useState } from "react";
import ProductSkeleton from "../components/ProductSkeleton";
import ErrorState from "../components/ErrorState";

export default function Products() {
  const [category, setCategory] = useState("all");
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({
    category: category === "all" ? "" : category,
  });

  if (isLoading) return <ProductSkeleton />;
  if (error) return <ErrorState />;

  const items = products?.results ?? [];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "home", name: "Home & Kitchen" },
    { id: "beauty", name: "Beauty" },
    { id: "sports", name: "Sports & Outdoors" },
  ];

  // Format price in KES
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    })
      .format(price)
      .replace("KES", "KSh");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Our Products
          </h1>
          <p className="mt-3 text-gray-600">
            Quality products at affordable prices
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-col items-center">
            <h2 className="text-sm font-medium text-gray-500 mb-3">
              SHOP BY CATEGORY
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(({ id, name }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    category === id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {items?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items?.map(({ id, image_url, name, category, price }) => (
              <Link
                to={`/products/${id}`}
                key={id}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={image_url}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{category}</p>
                  <p className="font-bold text-blue-600">
                    {formatPrice(price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
