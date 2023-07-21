
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ShopifyClient } from './shopify/ShopifyClient';
import { PriceFormat } from './shopify/PriceFormat';

const ProductList = () => {

  const options = [
    {value: 'ID', text: 'Featured'},
    {value: 'TITLE-ASCENDING', text: 'Alphabetically (A-Z)'},
    {value: 'TITLE-DESCENDING', text: 'Alphabetically (Z-A)'},
    {value: 'PRICE-ASCENDING', text: 'Price (lowest to highest)'},
    {value: 'PRICE-DESCENDING', text: 'Price (highest to lowest)'},
    {value: 'CREATED-ASCENDING', text: 'Date (oldest to newest)'},
    {value: 'CREATED-DESCENDING', text: 'Date (newest to oldest)'},
  ];

  const mappedOptions = {
    'ID': {sortKey: 'ID'},
    'TITLE-ASCENDING': {sortKey: 'TITLE', reverse: false},
    'TITLE-DESCENDING': {sortKey: 'TITLE', reverse: true},
    'PRICE-ASCENDING': {sortKey: 'PRICE', reverse: false},
    'PRICE-DESCENDING': {sortKey: 'PRICE', reverse: true},
    'CREATED-ASCENDING': {sortKey: 'CREATED_AT', reverse: false},
    'CREATED-DESCENDING': {sortKey: 'CREATED_AT', reverse: true}
  }
  const [sortBy, setSortBy] = useState('ID')
  const [products, setProducts] = useState([])
  const query = {first: 60}

  useEffect(() => {
    ShopifyClient.product.fetchQuery({...query, ...mappedOptions[sortBy]}).then((products) => {
      setProducts(products)
    });
  }, [sortBy, mappedOptions, query])

  const selectOptions = () => {
    return options.map((option) => {
      return <option key={option.value} value={option.value}>{option.text} 
             </option>;
    });
  }

  const handleChange = (e) => {
    setSortBy(e.target.value);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
      <div className="bg-white">
        <label htmlFor="sort_by" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Sort : </label>
        <select onChange={handleChange} id="sort_by" className="p-2 mb-6 border text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {selectOptions()}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
        <Link className="group" key={product.id} to={'/products/' + product.id.match(/\d+/).join()}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.images[0].src}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center group-hover:opacity-75 lg:h-full lg:w-full"
            />
          </div>
          <div className="flex justify-between">
            <h3 className="mt-4 text-l text-gray-700">{product.title}</h3>
            <p className="mt-4 text-l text-gray-700">{PriceFormat(product.variants[0].price.amount)}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList;