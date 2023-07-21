import { Link } from 'react-router-dom'
import { PriceFormat } from './shopify/PriceFormat';
const featuredProducts = ({products}) => {

  return (
    <div className="mx-auto max-w-2xlpy-8 py-8 sm:py-8 lg:max-w-7xl">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.images[0].src}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link className="group" key={product.id} to={'/products/' + product.id.match(/\d+/).join()}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                  </Link>
                </h3>
                <div className="flex justify-between">
                  <p className="mt-1 text-gray-700">{product.title}</p>
                  <p className="mt-1 text-gray-700">{PriceFormat(product.variants[0].price.amount)}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default featuredProducts;