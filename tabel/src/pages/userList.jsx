import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import Modal from "../components/Model";
import Button from "../components/AddButton";

const API_URL = "http://localhost:8080/api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0
  });

  // 🔥 Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update stats when users change
  useEffect(() => {
    setStats({
      total: users.length,
      active: users.length,
      newThisMonth: Math.floor(users.length * 0.3) // Example calculation
    });
  }, [users]);

  const fetchUsers = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      showNotification("Data refreshed successfully!", "success");
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("Failed to fetch users", "error");
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  // 🔥 Add User
  const addUser = async (user) => {
    setIsLoading(true);
    try {
      await axios.post(API_URL, user);
      await fetchUsers();
      showNotification("✨ User added successfully!", "success");
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification("Failed to add user", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Update User
  const updateUser = async (updatedUser) => {
    setIsLoading(true);
    try {
      await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
      await fetchUsers();
      setEditUser(null);
      showNotification("📝 User updated successfully!", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification("Failed to update user", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Delete User
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchUsers();
      showNotification("🗑️ User deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification("Failed to delete user", "error");
    }
  };

  // 🔎 Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`
              transform transition-all duration-500 animate-slideInRight
              ${type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-pink-600'}
              text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]
              hover:scale-105 cursor-pointer
            `}
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== id))}
          >
            <div className="flex-1">{message}</div>
            <button className="text-white/80 hover:text-white">✕</button>
          </div>
        ))}
      </div>

      {/* Header with Stats */}
      <div className="relative mb-8 animate-fadeInDown">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <span className="text-5xl">👥</span>
              User Management
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Manage your users efficiently
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              text={isRefreshing ? "Refreshing..." : "Refresh"}
              variant="outline"
              onClick={fetchUsers}
              disabled={isRefreshing}
              className={isRefreshing ? 'animate-pulse' : ''}
            />
            <Button
              text="Add User"
              onClick={() => {
                setEditUser(null);
                setOpen(true);
              }}
              className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600">↑ 12% this month</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Now</p>
                <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🟢</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600">All active</div>
          </div>


          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Search Results</p>
                <p className="text-2xl font-bold text-gray-800">{filteredUsers.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-yellow-600">Filtered users</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 group animate-fadeInUp" style={{animationDelay: '0.5s'}}>
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="w-full p-4 pl-12 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-lg focus:border-blue-500 focus:outline-none transition-all duration-300 hover:shadow-xl group-hover:scale-[1.01]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
          >
            ✕
          </button>
        )}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        
        {/* Search stats */}
        {searchTerm && (
          <div className="absolute -bottom-6 left-4 text-sm text-gray-500 animate-fadeIn">
            Found {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
        <Table
          users={filteredUsers}
          onDelete={deleteUser}
          onEdit={(user) => {
            setEditUser(user);
            setOpen(true);
          }}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform animate-scaleIn">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Processing...
              </p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {open && (
        <Modal
          onClose={() => {
            setOpen(false);
            setEditUser(null);
          }}
          onSave={editUser ? updateUser : addUser}
          editUser={editUser}
        />
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserList;