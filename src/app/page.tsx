'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import TodoList from '@/components/todo-list'
// import the todo list component from /components

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await fetch('/api/get-name');
        const data = await response.json();
        if (data.name) setUserName(data.name);
      } catch (error) {
        console.error('Failed to fetch saved name:', error);
      }
    };

    fetchName();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const changeName = async () => {
    const newName = prompt("Enter your name:");
    if (!newName) return;

    setUserName(newName);

    try {
      const response = await fetch('/api/save-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Failed to save name:', error);
    }
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
            <br></br>
            <div className="font-bold text-xl border-b pb-2 hover:bg-gray-100 hover:cursor-pointer"><Link href="/login">Merge</Link></div>
            <div className="text-blue-600 font-semibold">Home</div>
            <div><Link href="/fitness">Fitness</Link></div>
            <div><Link href="/work">Work</Link></div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="pt-20 px-6 md:px-16">
        <header className="mb-10">
          <h1 className="text-3xl font-bold cursor-pointer" onClick={changeName}>
            <span className="text-blue-700">{userName ? userName : 'User'}</span>&apos;s Merge
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            &quot;Don&apos;t judge each day by the harvest you reap but by the seeds you plant.&quot;
          </p>
        </header>

      {/* To-Do List Section */}
      <TodoList />

      </main>
    </div>
  );
}
