import { useEffect, useState } from "react";
import { ShopifyClient } from "../shopify/ShopifyClient";
import FeaturedProducts from "../FeaturedProducts";
import { useSinglePrismicDocument } from '@prismicio/react'
import Hero from "../Hero";
import LoadingSpinner from "../LoadingSpinner";

const Homepage = () => {

  const [featuredProducts, setFeaturedProducts] = useState([])
  const [ctas, { state }] = useSinglePrismicDocument('ctas')

  useEffect(() => {
    ShopifyClient.collection.fetchWithProducts('gid://shopify/Collection/606014079319').then((collection) => {
      setFeaturedProducts(collection.products)
    });    
  }, [])

  if (state !== 'loaded') {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className="homepage">
        {( state === 'loaded' && <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            {ctas.data.body.map((item, idx) => {
               return (
                  <Hero key={idx} items={item.items} />
               )
            })}
            <FeaturedProducts products={featuredProducts} />
        </div>
        )}
        
    </div>
  )
}

export default Homepage;