
import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogEdit() {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post {id}</h1>
      {/* Blog edit form */}
    </div>
  );
}
