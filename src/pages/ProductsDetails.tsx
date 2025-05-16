import { useParams, Link } from "react-router";
import { useGetProductByIdQuery } from "../app/services/productApi";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import RecommendedProducts from "../components/RecommendedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));


  

  if (isLoading || !product) return <ProductDetailsSkeleton />;
  if (isError) return <ErrorState />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 sm:p-10">
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[400px] object-cover object-center"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-2 text-gray-500 text-sm">{product.category}</p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description || "No description available."}
            </p>

            <p className="text-2xl font-bold text-indigo-600">
              ${product.price}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RecommendedProducts />
    </div>
  );
}

const ProductDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 sm:p-10 animate-pulse">
      <div className="mb-6 h-5 w-32 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-200 rounded-lg h-[400px]" />
        <div className="space-y-5">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-16 w-full bg-gray-200 rounded" />
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="flex gap-2 mt-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-14 bg-gray-200 rounded-full" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded mt-6" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center">
      <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Product not found
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't find the product you're looking for.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Back to Products
      </Link>
    </div>
  </div>
);
