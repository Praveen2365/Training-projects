import React, { useState } from "react";

const AddButton = ({
  text,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  icon = null,
  size = "md",
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    if (onClick) onClick(e);
  };

  // Size variations
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const base = `
    ${sizes[size]}
    rounded-xl font-semibold 
    relative overflow-hidden 
    transition-all duration-500 ease-out
    shadow-lg hover:shadow-2xl 
    transform hover:scale-105 hover:-translate-y-1 
    active:scale-95 active:translate-y-0 
    focus:outline-none focus:ring-4 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed 
    disabled:hover:scale-100 disabled:hover:translate-y-0
    group
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 
      text-white 
      hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700
      focus:ring-blue-400
      bg-[length:200%_200%] hover:bg-right-top
      animate-gradient
    `,
    danger: `
      bg-gradient-to-r from-red-600 via-pink-500 to-red-600 
      text-white 
      hover:from-red-700 hover:via-pink-600 hover:to-red-700
      focus:ring-red-400
      bg-[length:200%_200%] hover:bg-right-top
      animate-gradient
    `,
    success: `
      bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 
      text-white 
      hover:from-green-700 hover:via-emerald-600 hover:to-green-700
      focus:ring-green-400
      bg-[length:200%_200%] hover:bg-right-top
      animate-gradient
    `,
    warning: `
      bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 
      text-white 
      hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-600
      focus:ring-yellow-400
      bg-[length:200%_200%] hover:bg-right-top
      animate-gradient
    `,
    outline: `
      border-2 border-blue-600 
      text-blue-600 
      hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 
      hover:text-white
      focus:ring-blue-400
      relative
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600 before:to-indigo-600 
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
      overflow-hidden
    `,
    ghost: `
      bg-transparent 
      text-gray-700 
      hover:bg-gray-100 
      focus:ring-gray-400
      border border-gray-300
      hover:border-gray-400
    `,
  };

  // Icon mapping
  const getIcon = () => {
    if (icon) return icon;
    
    switch(variant) {
      case 'primary':
        return (
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'danger':
        return (
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        ${base} 
        ${variants[variant]} 
        ${className} 
        ${clicked ? 'animate-click-pop' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        
        /* Animated background effects */
        before:absolute before:inset-0 
        before:bg-white before:opacity-0 
        hover:before:opacity-20 
        before:transition-opacity before:duration-500
        
        /* Shimmer effect */
        after:absolute after:inset-0 
        after:bg-gradient-to-r after:from-transparent 
        after:via-white/30 after:to-transparent 
        after:opacity-0 
        hover:after:opacity-100 
        after:translate-x-[-100%] 
        hover:after:translate-x-[100%] 
        after:transition-all after:duration-1000 
        after:pointer-events-none
        
        /* Glow effect on hover */
        ${hovered && !disabled ? 'animate-glow' : ''}
      `}
    >
      {/* Ripple effect on click */}
      {clicked && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="absolute w-full h-full bg-white/30 animate-ripple"></span>
        </span>
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {getIcon() && (
          <span className={`
            transition-all duration-500
            ${hovered ? 'animate-bounce-small' : ''}
          `}>
            {getIcon()}
          </span>
        )}
        <span className={`
          relative
          after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
          after:bg-white after:scale-x-0 hover:after:scale-x-100 
          after:transition-transform after:duration-300 after:origin-left
        `}>
          {text}
        </span>
      </span>

      {/* Particle effect on click (optional) */}
      {clicked && variant !== 'outline' && variant !== 'ghost' && (
        <>
          <span className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-particle"></span>
          <span className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-particle-delay"></span>
          <span className="absolute bottom-0 left-1/3 w-1 h-1 bg-white rounded-full animate-particle2"></span>
        </>
      )}
    </button>
  );
};

export default AddButton;