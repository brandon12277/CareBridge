"use client"
import { useState } from 'react';

function ChatBot() {
  const [searchQuery, setSearchQuery] = useState('');
  const persons = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Hannah',
  ];

  // Filter persons based on the search query
  const filteredPersons = persons.filter(person =>
    person.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-4">
      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a person"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Persons List */}
      <div className="h-64 overflow-y-auto">
        {filteredPersons.length > 0 ? (
          <ul className="space-y-2">
            {filteredPersons.map((person, index) => (
              <li
                key={index}
                className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                <div className="h-10 w-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                  {person[0]}
                </div>
                <span className="ml-3 text-gray-700">{person}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No persons found.</p>
        )}
      </div>
    </div>
  );
}

export default ChatBot;

