import { Link } from "react-router-dom";

const Hero = ({items}) => {
  if (items.length === 1) {
    let data = items[0];
    return (
      <div className="h-64  mt-8 rounded-md overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${data.image.url})`}}>
        <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
          <div className="px-10 max-w-xl">
            <h2 className="text-2xl text-white font-semibold">{data.title[0].text}</h2>
            <p className="mt-2  mb-6 text-white">{data.description[0].text}</p>
            <Link to={data.link[0].text} className="items-center w-36 mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              <span>{data.action_text[0].text}</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderItem = items.map((item, idx) => {
    return (
      <div key={idx} className="mt-8 sm:mt-0 w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"  style={{backgroundImage: `url(${item.image.url})`}}>
        <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
          <div className="px-10 max-w-xl">
            <h2 className="text-2xl text-white font-semibold">{item.title[0].text}</h2>
            <p className="mt-2 text-white">{item.description[0].text}</p>
            <Link  to={item.link[0].text} className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
              <span>{item.action_text[0].text}</span>
            </Link>
          </div>
        </div>
      </div>
    )
  });
  
  return (
    <div className="md:flex mt-8 md:-mx-4">
      {renderItem}
    </div>
  )

}

export default Hero;