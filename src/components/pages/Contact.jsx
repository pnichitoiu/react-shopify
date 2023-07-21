import { useState } from "react" 
import { useSinglePrismicDocument } from '@prismicio/react'
import LoadingSpinner from '../LoadingSpinner'

const Contact = () => {

  const [contact, { state }] = useSinglePrismicDocument('contact')
  const [formStatus, setFormStatus] = useState('Send')
  const onSubmit = (e) => {
    e.preventDefault();

    setFormStatus('Sent');
  }

  const renderSlice = slice => {
    let sliceClass = 'w-full pt-6 sm:pt-10';
    let childClass = '';
    if(slice.items.length > 1) {
      sliceClass = 'flex flex-col sm:flex-row';
      childClass = 'w-full pt-6 sm:mr-3 sm:w-1/2';
    } 

    return (
      <div className={sliceClass}>
        {slice.items.map((field, index) => {
            return (
              <div key={index} className={childClass}>
                {renderField(field)}
              </div>
            )

        })}
      </div>
    )
  }

  const renderField = field => {
    if(field.type === 'text') {
      return (
        <div>
          <label className="block pb-3 text-sm dark:text-white">{field.label[0].text}</label>
          <input type="text" placeholder={field.label[0].text} id={field.name[0].text} name={field.name[0].text} className="w-full text-sm peer border border-primary bg-grey-lightest px-5 py-4 font-body font-light text-primary placeholder-primary transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white"/>
          <p className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter your {field.name[0].text}
            </p>
        </div>
      )
    } else if(field.type === 'textarea') {
      return ( 
        <div>
          <label className="block pb-3 text-sm dark:text-white">{field.label[0].text}</label>
          <textarea placeholder={field.label[0].text} id={field.name[0].text} name={field.name[0].text} cols="30" rows="9" required className="w-full peer text-sm border border-primary bg-grey-lightest px-5 py-4 font-body font-light text-primary placeholder-primary transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary dark:text-white"></textarea>
          <p className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter your {field.name[0].text}
            </p>
        </div>
      )
    }
  }

  if (state !== 'loaded') {
    return (
      <LoadingSpinner/>
    )
  }

  console.log(contact)

  const initialFormState = {
    username: "",
    email: "",
    password: "",
    hasConsented: false,
    };

  return (
    <div className="mx-auto container max-w-7xl items-center justify-between p-6 lg:px-8">
      <h1 className="text-2xl">{contact.data.form_title[0].text}</h1>
      <div className="mt-4 text-md text-gray-900">
        {contact.data.form_action_description[0].text}
      </div>

      {
        formStatus === 'Sent' && (
          <div className="mt-4 text-md text-emerald-600">
            {contact.data.success_message[0].text}
          </div>
        )
      }
      
      {
        formStatus === 'Send' && (

        <form noValidate className="pt-8 group" onSubmit={onSubmit}>
          {contact.data.body.map((slice, index) => {
            return (
              <div key={index}>
                {renderSlice(slice)}
              </div>
            )
          })}
          <button type="submit" className="group-invalid:pointer-events-none group-invalid:opacity-30 mt-10 mb-12 block text-sm bg-indigo-600 px-10 py-4 text-center font-body text-white transition-colors hover:bg-green sm:inline-block sm:text-left">
            {contact.data.submit_button_text[0].text}
          </button>
        </form>
        )
      }
      
    </div>
  )
}

export default Contact;