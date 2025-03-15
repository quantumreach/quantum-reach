
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Admin sidebar would go here */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
