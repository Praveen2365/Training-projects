import { useState } from 'react';

const Table = ({ users, onDelete, onEdit }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 400);
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setTimeout(() => {
      onEdit(user);
      setEditingId(null);
    }, 300);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedRows.length === users.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map(user => user.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-100 bg-white transform transition-all duration-500 hover:shadow-3xl">
      {/* Table header with animated gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users Directory
            </h2>
            <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              {users.length} {users.length === 1 ? 'user' : 'users'} found
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6">
                <input
                  type="checkbox"
                  checked={selectedRows.length === users.length && users.length > 0}
                  onChange={selectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-transform hover:scale-110"
                />
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center gap-1 group cursor-pointer">
                  <span>ID</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                User Information
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Contact Details
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`
                  border-b border-gray-100 transition-all duration-500 ease-out
                  ${hoveredRow === user.id ? 'bg-blue-50/50 scale-[1.01] shadow-lg' : 'hover:bg-gray-50/50'}
                  ${deletingId === user.id ? 'animate-slideOut opacity-0' : 'animate-slideIn'}
                  ${selectedRows.includes(user.id) ? 'bg-blue-50/30' : ''}
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}
                  relative group cursor-pointer
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => toggleRowSelection(user.id)}
              >
                {/* Animated border glow on hover */}
                <div className={`absolute inset-0 border-2 border-blue-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${hoveredRow === user.id ? 'scale-100' : 'scale-95'}`}></div>
                
                {/* Shimmer effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none transform -skew-x-12 ${hoveredRow === user.id ? 'translate-x-full' : '-translate-x-full'}`}></div>

                {/* Checkbox Cell */}
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => toggleRowSelection(user.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-transform hover:scale-110"
                  />
                </td>

                {/* ID Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <span className="font-bold text-white">#{user.id}</span>
                    </div>
                  </div>
                </td>

                {/* Name Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                        Active now
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center group/email">
                    <div className="p-2 rounded-lg bg-gray-100 group-hover/email:bg-blue-100 transition-colors duration-300">
                      <svg className="w-5 h-5 text-gray-500 group-hover/email:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900 font-medium group-hover/email:text-blue-600 transition-colors">
                        {user.email}
                      </div>
                      <div className="text-xs text-gray-500">Verified</div>
                    </div>
                  </div>
                </td>

                {/* Status Cell */}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Active
                    <span className="ml-1 text-green-600">●</span>
                  </span>
                </td>

                {/* Actions Cell */}
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(user);
                      }}
                      disabled={editingId === user.id}
                      className={`
                        relative group/btn
                        px-4 py-2
                        bg-gradient-to-r from-amber-400 to-orange-500
                        text-white
                        rounded-xl
                        font-medium
                        text-sm
                        shadow-md
                        hover:shadow-xl
                        transform transition-all duration-300
                        hover:scale-110 hover:-translate-y-1
                        active:scale-95 active:translate-y-0
                        overflow-hidden
                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                        ${editingId === user.id ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      
                      {editingId === user.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Editing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </div>
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                      disabled={deletingId === user.id}
                      className={`
                        relative group/btn
                        px-4 py-2
                        bg-gradient-to-r from-rose-500 to-red-600
                        text-white
                        rounded-xl
                        font-medium
                        text-sm
                        shadow-md
                        hover:shadow-xl
                        transform transition-all duration-300
                        hover:scale-110 hover:-translate-y-1
                        active:scale-95 active:translate-y-0
                        overflow-hidden
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                        ${deletingId === user.id ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      
                      {/* Loading animation */}
                      {deletingId === user.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Delete</span>
                        </div>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      {users.length === 0 ? (
        <div className="text-center py-16 animate-fadeIn">
          <div className="inline-block p-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-6 animate-bounce">
            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">No users found</h3>
          <p className="text-gray-500 mb-4">Add your first user to get started</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Add New User
          </button>
        </div>
      ) : (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                <span className="text-gray-600">
                  <span className="font-semibold">{selectedRows.length}</span> selected
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Showing</span>
                <span className="mx-1 font-semibold text-gray-700">{users.length}</span>
                <span className="text-gray-500">entries</span>
              </div>
            </div>
            <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-gray-500">Last updated:</span>
              <span className="ml-2 font-semibold text-gray-700">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes slideOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
        }
        
        .animate-slideOut {
          animation: slideOut 0.4s ease-in forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Table;