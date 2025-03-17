'use client'

import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewBlogForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured_image: '',
    slug: '',
    published: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    })
    
    if (response.ok) {
      router.push('/dashboard/blogs')
      router.refresh()
    } else {
      alert('Failed to create blog')
    }
    setSubmitting(false)
  }

  const generateSlug = () => {
    const slug = blog.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    setBlog({ ...blog, slug })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              onBlur={blog.slug ? undefined : generateSlug}
              placeholder="Blog Title"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={blog.slug}
                onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
                placeholder="blog-slug"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button 
                type="button" 
                onClick={generateSlug}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <div data-color-mode="light" className="border rounded">
            <MDEditor
              value={blog.content}
              onChange={(value) => setBlog({ ...blog, content: value || '' })}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]]
              }}
              height={400}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea
            value={blog.excerpt}
            onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
            placeholder="Short description"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={blog.published}
            onChange={(e) => setBlog({ ...blog, published: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            id="published"
          />
          <label htmlFor="published" className="ml-2">Published</label>
        </div>
        
        <div className="pt-4 border-t mt-6">
          <h2 className="text-lg font-medium mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={blog.meta_title}
                onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                value={blog.meta_description}
                onChange={(e) => setBlog({ ...blog, meta_description: e.target.value })}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
              <input
                type="text"
                value={blog.meta_keywords}
                onChange={(e) => setBlog({ ...blog, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Link 
            href="/dashboard/blogs" 
            className="bg-gray-500 text-white px-6 py-2.5 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}
