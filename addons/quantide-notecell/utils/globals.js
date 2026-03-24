// Global utilities for NoteCell addon

// Export globals constant that references window object
export const globals = typeof window !== 'undefined' ? window : {};

// Utility functions
export const isShow = (value) => {
  return value !== undefined && value !== null && value !== false;
};

export const choice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const createStyle = (styles) => {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
};

export const randomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const mergeTransform = (...transforms) => {
  return transforms.filter(Boolean).join(' ');
};

export const createJsTag = (src, attributes = {}) => {
  const script = document.createElement('script');
  script.src = src;
  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  return script;
};

export const createScriptTag = (content, attributes = {}) => {
  const script = document.createElement('script');
  script.textContent = content;
  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  return script;
};

// Simple MD5 implementation (basic version)
export const md5 = (string) => {
  // This is a simplified version - in production, use crypto-js
  let hash = 0;
  if (string.length === 0) return hash.toString();
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};