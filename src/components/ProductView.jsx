
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { ShopifyClient } from './shopify/ShopifyClient';
import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from './LoadingSpinner';
import { PriceFormat } from './shopify/PriceFormat';
import { CartContext } from '../store/CartContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductView = () => {

  const [product, setProduct] = useState({})
  const [selectedSize, setSelectedSize] = useState()
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const reviews = { href: '#', average: 4, totalCount: 50 }
  const cart = useContext(CartContext);

  useEffect(() => {
    let productIdentifier = 'gid://shopify/Product/' + params.productId;
    ShopifyClient.product.fetch(productIdentifier).then((product) => {
      setProduct(product);
      setSelectedSize(product.variants[0].title);
    });

  }, [params]);

  const variantId = () => {
    let variant = product.variants.filter((variant) => {
      return variant.title === selectedSize;
    })
    return variant[0].id;
  }

  const addToCart = (e) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, "1000");
    cart.addItemToCart(variantId(), qty)
  }

  if (!product.id) {
    return (
      <LoadingSpinner/>
    )
  }

  const incrementQty = (e) => {
    e.preventDefault();
    if (qty === 20) return false;
    setQty(qty => qty + 1);
  }

  const decrementQty = (e) => {
    e.preventDefault();
    if (qty === 1) return false;
    setQty(qty => qty - 1 );
  }

  return (

    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 sm-grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-7">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0].src}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:col-span-5 lg:mt-0">
            <div className="flex justify-between">
              <h1 className="text-xl text-gray-900">{product.title}</h1>
              <p className="text-xl text-gray-900">{PriceFormat(product.variants[0].price.amount)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            
            <form className="mt-10">
              {/* Sizes */}
              { product.variants.length > 1 && (<div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.variants.map((size) => (
                      <RadioGroup.Option
                        key={size.title}
                        value={size.title}
                        className={({ active }) =>
                          classNames(
                            size.available
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.title}</RadioGroup.Label>
                            {size.available ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>)}

              <div className="mt-10">
                <div className="custom-number-input w-32">
                  <label htmlFor="qty-input" className="w-full text-gray-700 text-sm font-semibold">Qty</label>
                  <div className="flex items-center mt-4 flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border-2">
                    <button data-action="decrement" onClick={decrementQty} className="h-full w-20 rounded-l cursor-pointer">
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <span>{qty}</span>
                    <button data-action="increment" onClick={incrementQty}  className="h-full w-20 rounded-r cursor-pointer">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => addToCart()}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading === true ? 'Adding to cart ...' : 'Add to cart' }
                </button>
              </div>
            </form>

            <div className="mt-6">
              <h2 className="text-sm text-gray-900">Description</h2>
              <div className="text-sm text-gray-500 mt-4">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductView;