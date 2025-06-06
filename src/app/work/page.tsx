'use client';

import { useState } from 'react';
import Link from 'next/link';

import TaskManager from '@/components/task-manager'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900">
      {/* Menu Button */}
      <div className="fixed top-4 left-4 z-50 cursor-pointer" onClick={toggleSidebar}>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black"></div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <nav className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 p-6">
          <div className="space-y-4">
            <br></br>
            <div className="font-bold text-xl border-b pb-2 hover:bg-gray-100 hover:cursor-pointer"><Link href="/login">Merge</Link></div>
            <div><Link href="/">Home</Link></div>
            <div><Link href="/fitness">Fitness</Link></div>
            <div className="text-blue-600 font-semibold">Work</div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="pt-20 px-6 md:px-16">
        <header className="mb-10">
          <h1 className="text-3xl font-bold cursor-pointer">
            Work
          </h1>
        </header>
        <TaskManager />
      </main>
    </div>
  );
}