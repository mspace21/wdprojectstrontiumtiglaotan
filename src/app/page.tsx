'use client';

import { useEffect, useState } from 'react';

import TodoList from '@/components/todo-list'
// import the todo list component from /components

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('User');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const changeName = () => {
    const name = prompt("Enter your name:");
    if (name) setUserName(name);
  };
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
            <div className="text-blue-600 font-semibold">Home</div>
            <div><a href="/fitness">Fitness</a></div>
            <div><a href="/work">Work</a></div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="pt-20 px-6 md:px-16">
        <header className="mb-10">
          <h1 className="text-3xl font-bold cursor-pointer" onClick={changeName}>
            <span className="text-blue-700">{userName}</span>'s Space
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            "Don't judge each day by the harvest you reap but by the seeds you plant."
          </p>
        </header>

      {/* To-Do List Section */}
      <TodoList />

      </main>
    </div>
  );
}
