# MindSquad - Tailwind CSS Implementation Guide

## Overview
This guide provides practical implementation instructions for using the Universal Design System Profile with Tailwind CSS v4.1.17 in the MindSquad project.

## Setup and Configuration

### Current Setup (Already Configured)
The project is already set up with:
- Vite v7.1.7 with @tailwindcss/vite plugin
- Tailwind CSS v4.1.17
- React 19.1.1

### Verification Steps
1. **Check Vite Configuration** (`frontend/vite.config.js`):
```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

2. **Check Tailwind Import** (`frontend/src/index.css`):
```css
@import "tailwindcss";
```

3. **Check Dependencies** (`frontend/package.json`):
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "tailwindcss": "^4.1.17"
  }
}
```

## Design Token Implementation

### Color Tokens Usage
Based on the Universal Design System Profile, use semantic color classes:

```jsx
// Primary Brand Colors
<div className="bg-blue-50 dark:bg-blue-950">Light background</div>
<div className="bg-blue-500">Main brand color</div>
<div className="bg-blue-900 dark:bg-blue-50">Dark text with light background</div>

// Secondary Colors
<div className="bg-purple-50 dark:bg-purple-950">Light background</div>
<div className="bg-purple-500">Main secondary color</div>

// Neutral Colors
<div className="bg-gray-50 dark:bg-gray-900">Background</div>
<div className="bg-gray-500">Neutral element</div>
<div className="text-gray-900 dark:text-white">Text</div>

// Semantic Colors
<div className="bg-green-50 text-green-600">Success</div>
<div className="bg-yellow-50 text-yellow-600">Warning</div>
<div className="bg-red-50 text-red-600">Error</div>
<div className="bg-blue-50 text-blue-600">Info</div>
```

### Typography Implementation
```jsx
// Page Title
<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
  Page Title
</h1>

// Section Heading
<h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
  Section Heading
</h2>

// Subsection
<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
  Subsection
</h3>

// Card Title
<h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
  Card Title
</h4>

// Body Text
<p className="text-base text-gray-600 dark:text-gray-300 mb-4">
  Body text content
</p>

// Secondary Text
<p className="text-sm text-gray-500 dark:text-gray-400">
  Secondary information
</p>
```

### Spacing Implementation
```jsx
// Component Padding
<div className="p-4 md:p-6">
  {/* Content with responsive padding */}
</div>

// Section Spacing
<section className="py-12 md:py-16 lg:py-20">
  {/* Vertically spaced sections */}
</section>

// Item Gap
<div className="space-y-4 md:space-y-6">
  {/* Stack of items with consistent gaps */}
</div>

// Layout Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Centered container with responsive padding */}
</div>
```

## Component Implementation Examples

### Button Components
```jsx
// Primary Button
<button className="
  inline-flex items-center px-4 py-2 
  bg-blue-600 hover:bg-blue-700 
  text-white font-medium 
  rounded-lg 
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button Text
</button>

// Secondary Button
<button className="
  inline-flex items-center px-4 py-2 
  bg-white hover:bg-gray-50 
  text-gray-700 font-medium border border-gray-300
  rounded-lg 
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Secondary Button
</button>

// Ghost Button
<button className="
  inline-flex items-center px-4 py-2 
  text-gray-600 hover:text-gray-900 hover:bg-gray-100
  font-medium rounded-lg
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Ghost Button
</button>
```

### Card Components
```jsx
// Basic Card
<div className="
  bg-white dark:bg-gray-800 
  rounded-xl 
  shadow-sm 
  p-6
  border border-gray-200 dark:border-gray-700
">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    Card Title
  </h3>
  <p className="text-gray-600 dark:text-gray-300">
    Card content goes here
  </p>
</div>

// Interactive Card
<div className="
  bg-white dark:bg-gray-800 
  rounded-xl 
  shadow-sm hover:shadow-md
  p-6
  border border-gray-200 dark:border-gray-700
  transition-shadow duration-200
  cursor-pointer
">
  Interactive Card
</div>
```

### Form Components
```jsx
// Input Field
<div className="space-y-1">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Label
  </label>
  <input 
    className="
      w-full px-3 py-2 
      border border-gray-300 dark:border-gray-600
      rounded-lg 
      bg-white dark:bg-gray-700
      text-gray-900 dark:text-white
      placeholder-gray-400 dark:placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
    " 
    placeholder="Enter text..."
  />
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Helper text
  </p>
</div>
```

### Navigation Components
```jsx
// Header Navigation
<header className="
  bg-white dark:bg-gray-900 
  border-b border-gray-200 dark:border-gray-700
  px-4 sm:px-6 lg:px-8
  py-4
">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        MindSquad
      </h1>
    </div>
    <nav className="hidden md:flex items-center space-x-8">
      <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        Study
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        Groups
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        Profile
      </a>
    </nav>
  </div>
</header>
```

## Layout Patterns

### Container System
```jsx
// Responsive Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content centered with responsive padding */}
</div>

// Full Width Container
<div className="w-full">
  {/* Full width content */}
</div>
```

### Grid System
```jsx
// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">Item 1</div>
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">Item 2</div>
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">Item 3</div>
</div>

// Auto-fit Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Automatically fits content */}
</div>
```

### Flexbox Patterns
```jsx
// Stack Pattern (Vertical)
<div className="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Inline Pattern (Horizontal)
<div className="flex items-center space-x-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Split Pattern (Space Between)
<div className="flex items-center justify-between">
  <div>Left Content</div>
  <div>Right Content</div>
</div>
```

## Dark Mode Implementation

### Dark Mode Setup
The project supports dark mode through Tailwind's `dark:` prefix. To enable dark mode:

1. **Global Setup** (ensure this is in `index.html` or root element):
```html
<div class="dark" id="app">
  <!-- Your React app mounts here -->
</div>
```

2. **Theme Toggle Component**:
```jsx
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
```

### Using Dark Mode Classes
```jsx
// Light/Dark Mode Card
<div className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
  hover:bg-gray-50 dark:hover:bg-gray-700
">
  Content that adapts to theme
</div>
```

## Responsive Design Implementation

### Breakpoint Classes
```jsx
// Mobile-First Approach
<div className="
  px-4 py-6 
  text-sm
  md:px-6 md:py-8 md:text-base
  lg:px-8 lg:py-10 lg:text-lg
">
  Responsive content
</div>

// Component Responsiveness
<div className="
  flex flex-col space-y-4
  md:grid md:grid-cols-2 md:gap-6 md:space-y-0
">
  <div>Card 1</div>
  <div>Card 2</div>
</div>
```

### Breakpoint Reference
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## Animation and Transitions

### Transition Examples
```jsx
// Button Hover
<button className="
  bg-blue-600 hover:bg-blue-700 
  transition-colors duration-200
">
  Hover me
</button>

// Card Hover
<div className="
  shadow-sm hover:shadow-md
  transition-shadow duration-200
">
  Interactive card
</div>

// Scale Animation
<div className="
  hover:scale-105
  transition-transform duration-200
  transform-gpu
">
  Scale on hover
</div>
```

## Accessibility Implementation

### Focus Management
```jsx
// Proper focus indicators
<button className="
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  dark:focus:ring-offset-gray-800
">
  Accessible button
</button>

// Skip to main content
<a href="#main-content" className="
  absolute -top-10 left-4 
  bg-blue-600 text-white px-4 py-2 rounded
  focus:top-4 transition-all duration-200
">
  Skip to main content
</a>
```

### Screen Reader Support
```jsx
// Icon-only button with aria-label
<button aria-label="Close modal" className="p-2 rounded hover:bg-gray-100">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

// Form labels and descriptions
<div className="space-y-1">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email address
  </label>
  <input 
    id="email" 
    type="email"
    aria-describedby="email-help"
    className="w-full px-3 py-2 border rounded-lg"
  />
  <p id="email-help" className="text-sm text-gray-500">
    We'll never share your email with anyone else.
  </p>
</div>
```

## Component Development Workflow

### 1. Start with Utility Classes
Begin implementing components using Tailwind's utility classes for rapid development.

### 2. Extract Common Patterns
Once patterns emerge, extract them into component classes:

```css
/* In your CSS file or Tailwind config */
@layer components {
  .btn-primary {
    @apply inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700;
  }
}
```

### 3. Use Semantic HTML
Build components using semantic HTML elements as the foundation.

### 4. Test Responsiveness
Ensure all components work across all breakpoints using Tailwind's responsive prefixes.

### 5. Test Dark Mode
Test components with dark mode toggled on to ensure proper contrast and visibility.

### 6. Ensure Accessibility
Add proper focus management, ARIA labels, and screen reader support.

## Best Practices

### Component Design
- Use semantic HTML elements appropriately
- Maintain consistent spacing and typography scales
- Test components across all breakpoints
- Ensure color contrast meets WCAG guidelines
- Implement proper focus management
- Test with screen readers for accessibility

### Performance
- Use Tailwind's JIT (Just-In-Time) mode for optimal bundle size
- Avoid creating unnecessary custom CSS when utilities can handle it
- Use Tailwind's built-in responsive utilities instead of custom media queries

### Maintenance
- Keep utility classes consistent across the codebase
- Document component patterns and usage in the design system
- Regular design system reviews to ensure consistency
- Update the Universal Design System Profile as patterns evolve

This implementation guide provides the foundation for consistent, accessible, and maintainable UI development using the Universal Design System Profile with Tailwind CSS v4.1.17.