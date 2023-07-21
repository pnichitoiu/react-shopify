import { useSinglePrismicDocument } from '@prismicio/react'
import LoadingSpinner from '../LoadingSpinner'

const AboutUs = () => {

  const [about_us, { state }] = useSinglePrismicDocument('about_us')

  if (state !== 'loaded') {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className="mx-auto container max-w-7xl items-center justify-between p-6 lg:px-8">
      <h1 className="text-2xl">{about_us.data.title[0].text}</h1>
      <div className="h-40 mt-4 rounded-md overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${about_us.data.image.url})`}}>
      </div>
      <div className="mt-4 text-md text-gray-900">
        {about_us.data.description[0].text}
      </div>
    </div>
  )
}

export default AboutUs;