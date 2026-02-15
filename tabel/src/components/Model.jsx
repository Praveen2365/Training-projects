import { useState, useEffect } from "react";
import AddButton from "./AddButton";

const Modal = ({ onClose, onSave, editUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);
    
    if (editUser) {
      setName(editUser.name);
      setEmail(editUser.email);
    }
  }, [editUser]);

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("All fields required");
      return;
    }

    const userData = {
      name,
      email,
    };

    if (editUser) {
      onSave({ ...userData, id: editUser.id });
    } else {
      onSave(userData);
    }

    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-500 ${
          isVisible 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-90 opacity-0 -translate-y-10'
        } ${isClosing ? 'scale-95 opacity-0 translate-y-10' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {editUser ? "✏️ Edit User" : "✨ Add User"}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <input
              type="text"
              placeholder=" "
              className="w-full p-3 border-2 rounded-xl peer focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
              name ? '-top-2 text-xs bg-white px-2 text-blue-500' : 'top-3 text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-500'
            }`}>
              Full Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              placeholder=" "
              className="w-full p-3 border-2 rounded-xl peer focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
              email ? '-top-2 text-xs bg-white px-2 text-blue-500' : 'top-3 text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-500'
            }`}>
              Email Address
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AddButton
              text="Cancel"
              variant="outline"
              onClick={handleClose}
            />
            <AddButton
              text={editUser ? "Update" : "Add"}
              variant="primary"
              type="submit"
            />
          </div>
        </form>

        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-2xl blur-3xl -translate-y-2"></div>
      </div>
    </div>
  );
};

export default Modal;