"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const BackButton = () => {
  const router =  useRouter()
  return (
    <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Back
      </button>
  )
}

export default BackButton