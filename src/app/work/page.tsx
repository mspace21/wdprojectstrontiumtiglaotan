'use client';

import { useEffect, useState } from 'react';

import TaskManager from '@/components/task-manager'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('User');

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
            <div className="font-bold text-xl border-b pb-2">Navigation</div>
            <div><a href="/">Home</a></div>
            <div><a href="/fitness">Fitness</a></div>
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