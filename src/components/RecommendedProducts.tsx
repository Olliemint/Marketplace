import { useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  useGetRelatedProductsMutation,
} from "../app/services/productApi";
import {
  getViewedProducts,
  saveViewedProduct,
} from "../utils/browsingHistory";

export default function RecommendedProducts() {
  const { id } = useParams();
  const productId = Number(id);

  const [getRecommendations, { data, isLoading }] =
    useGetRelatedProductsMutation();


  useEffect(() => {
    if (!productId) return;

    saveViewedProduct(productId);
      const history = getViewedProducts();
    getRecommendations({ viewed_products: history });
  }, [productId, getRecommendations]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Loading recommendations...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.recommendations || data.recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {data.message}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recommendations.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-indigo-600 font-semibold mt-1">
                ${product.price}
              </p>
              <Link
                to={`/products/${product.id}`}
                className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
