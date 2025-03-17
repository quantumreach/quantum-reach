'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteBlog({ slug }: { slug: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blogs/slug/${slug}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('An error occurred while deleting')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }
  
  return (
    <>
      <button 
        onClick={() => setShowConfirm(true)} 
        className="text-red-600 hover:text-red-800"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
