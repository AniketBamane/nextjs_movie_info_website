"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {uploadContact} from "@/actions/contactAction"
import {contactValidationSchema} from "@/validation/contactValidation"
import toast from 'react-hot-toast';

export default function Contact() {
  const formRef = useRef(null)
  const handleSubmit = async (formData) => {
    console.log(formData.get("name"))
    console.log(formData.get("email"))
    console.log(formData.get("message"))
    try{
    await contactValidationSchema.parseAsync({
      name:formData.get("name"),
      email:formData.get("email"),
      message:formData.get("message")
    })
    const contactDetails = await uploadContact(formData)
    if(!contactDetails.status == 200){
      toast.error(contactDetails.message)
    }
    else{
      toast.success(contactDetails.message)
      formRef.current.reset()
    }
    }catch(validationError){
      if(validationError.errors){
      toast.error(validationError.errors[0].message)
      }else{
        toast.error("an unexpected error occurred , please try again !")
      }
    }
  }
  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-[80%] mx-auto  my-32">
        <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <Image
              src="/contact.jpg"
              alt="Contact"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              layout="responsive"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form action={handleSubmit} className="space-y-4" ref={formRef}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
