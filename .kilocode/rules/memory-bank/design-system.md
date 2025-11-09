# EduPlay Modern 3D - Design System Profile

## Overview
EduPlay uses a modern, playful, and neumorphic-light design system built on Tailwind CSS v4.1.17, featuring 3D-centric elements, frosted glass effects, and responsive layouts optimized for educational applications.

## Design System Foundation

### Core Implementation
- **Framework**: Tailwind CSS v4.1.17
- **Build Tool**: Vite with @tailwindcss/vite plugin
- **Architecture**: Utility-first CSS with custom component patterns
- **Responsive**: Mobile-first approach with modern CSS Grid and Flexbox
- **Style**: Modern, Playful, Neumorphic-light, 3D-centric

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "primary": "#1A1A1A",
        "secondary": "#FFFFFF",
        "accent": "#FFC94D",
        "background": "#FDFBF5",
        "text-primary": "#1A1A1A",
        "text-secondary": "#8A8A8E",
        "text-muted": "#6B7280",
        "subtle-border": "#EAEAEA",
        "subtle-background": "rgba(0, 0, 0, 0.05)"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "h1": ["28px", { "lineHeight": "1.3", "fontWeight": "700" }],
        "h2": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "h3": ["18px", { "lineHeight": "1.4", "fontWeight": "600" }]
      },
      borderRadius: {
        "4xl": "2rem",      // 32px
        "5xl": "2.5rem"     // 40px
      },
      boxShadow: {
        "soft": "0 10px 30px -10px rgba(0, 0, 0, 0.08)"
      },
      animation: {
        "blob": "blob 10s infinite"
      },
      keyframes: {
        "blob": {
          "0%": { "transform": "translate(0px, 0px) scale(1)" },
          "33%": { "transform": "translate(40px, -60px) scale(1.1)" },
          "66%": { "transform": "translate(-30px, 30px) scale(0.9)" },
          "100%": { "transform": "translate(0px, 0px) scale(1)" }
        }
      }
    }
  }
}
```

## Color Palette

### Primary Color System
```css
/* Primary Brand Colors */
--primary: #1A1A1A;           /* Main brand dark color */
--secondary: #FFFFFF;         /* Clean white surfaces */
--accent: #FFC94D;            /* Warm yellow accent */
--background: #FDFBF5;        /* Off-white background */
```

### Text Color System
```css
/* Text Hierarchy */
--text-primary: #1A1A1A;      /* Main text content */
--text-secondary: #8A8A8E;    /* Secondary text */
--text-muted: #6B7280;        /* Muted/labels */
```

### Supporting Colors
```css
/* Supporting Elements */
--subtle-border: #EAEAEA;     /* Subtle borders */
--subtle-background: rgba(0, 0, 0, 0.05); /* Subtle backgrounds */
```

### Background Surfaces
- **Main Background**: `bg-background` - Soft off-white background
- **Surface Elements**: `bg-secondary` - Clean white surfaces
- **Glass Effects**: `bg-white/70 backdrop-blur-3xl` - Frosted glass panels

## Typography System

### Font Family
```css
font-family: {
  "sans": ["Inter", "sans-serif"]
}
```

### Custom Font Sizes
```css
fontSize: {
  "display": ["36px", { "lineHeight": "1.2", "fontWeight": "700" }],  // Hero text
  "h1": ["28px", { "lineHeight": "1.3", "fontWeight": "700" }],       // Main headings
  "h2": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],       // Section headings
  "h3": ["18px", { "lineHeight": "1.4", "fontWeight": "600" }]        // Subsection headings
}
```

### Typography Hierarchy
```html
<!-- Display Text - Hero titles -->
<h1 class="text-display text-primary">
  Hero Title
</h1>

<!-- Main Headings -->
<h1 class="text-h1 text-primary">
  Main Heading
</h1>

<!-- Section Headings -->
<h2 class="text-h2 text-primary">
  Section Heading
</h2>

<!-- Subsection Headings -->
<h3 class="text-h3 text-primary">
  Subsection Heading
</h3>

<!-- Body Text -->
<p class="text-base text-text-primary">
  Body text content
</p>

<!-- Secondary Text -->
<p class="text-sm text-text-secondary">
  Secondary information
</p>

<!-- Muted Text -->
<p class="text-sm text-text-muted">
  Labels and subtle text
</p>
```

## Layout System

### Mobile Container
```html
<!-- Phone-like container for mobile view -->
<div class="relative w-[390px] h-[844px] bg-secondary rounded-5xl shadow-2xl p-4 overflow-hidden">
  <!-- Mobile app content -->
</div>
```

### Desktop Layout
```html
<!-- Two-column grid for desktop view -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="col-span-1">Left Sidebar</div>
  <div class="lg:col-span-2">Main Content</div>
</div>
```

### Main Panel
```html
<!-- Main content area with frosted glass effect -->
<div class="bg-white/70 backdrop-blur-3xl rounded-4xl p-6 lg:p-8 shadow-soft ring-1 ring-black/5">
  <!-- Main content with glass effect -->
</div>
```

## Component System

### Button Components

#### Primary Button
**Purpose**: Main call-to-action, e.g., 'Next', 'Login'.

```html
<button class="
  h-14 
  bg-primary 
  text-secondary 
  font-bold 
  text-lg 
  rounded-full 
  transition-transform 
  hover:scale-105
">
  Primary Action
</button>
```

#### Secondary Button
**Purpose**: Secondary actions, e.g., 'End Session'.

```html
<button class="
  h-14 
  bg-secondary 
  text-primary 
  border 
  border-subtle-border 
  font-semibold 
  rounded-full 
  transition-colors 
  hover:border-gray-300
">
  Secondary Action
</button>
```

#### Quiz Option Button
**Purpose**: Selectable answers in a quiz.

```html
<button class="
  h-14 
  bg-secondary 
  text-primary 
  border 
  border-subtle-border 
  rounded-2xl 
  text-base 
  font-medium 
  transition-all 
  duration-200
  hover:border-gray-400
  focus:outline-none 
  focus:ring-2 
  focus:ring-accent
  selected:bg-accent 
  selected:text-primary 
  selected:border-transparent 
  selected:font-semibold
">
  Quiz Option
</button>
```

### Input Field Components
**Purpose**: For user input like email and password.

```html
<!-- Basic Input Field -->
<div class="space-y-1">
  <label class="block text-sm font-medium text-text-muted">
    Email Address
  </label>
  <input 
    class="
      h-14 
      w-full 
      bg-secondary 
      rounded-2xl 
      border 
      border-transparent 
      px-5 
      text-base 
      placeholder:text-text-secondary
      focus:outline-none 
      focus:ring-2 
      focus:ring-accent 
      focus:border-transparent
    " 
    placeholder="Enter your email..."
  />
  <p class="text-sm text-text-secondary">
    Helper text
  </p>
</div>

<!-- Password Input -->
<input 
  type="password"
  class="
    h-14 
    w-full 
    bg-secondary 
    rounded-2xl 
    border 
    border-transparent 
    px-5 
    text-base 
    placeholder:text-text-secondary
    focus:outline-none 
    focus:ring-2 
    focus:ring-accent 
    focus:border-transparent
  " 
  placeholder="Enter your password..."
/>
```

### Chip/Filter Components
**Purpose**: Filter tags for categories like 'All', 'Popular'.

```html
<!-- Default Chip -->
<button class="
  h-10 
  px-5 
  rounded-full 
  text-sm 
  font-medium 
  transition-colors 
  bg-gray-100 
  text-primary
">
  All
</button>

<!-- Active Chip -->
<button class="
  h-10 
  px-5 
  rounded-full 
  text-sm 
  font-medium 
  transition-colors 
  bg-primary 
  text-secondary
">
  Popular
</button>
```

### Sidebar Components (Desktop)

#### Sidebar Container
**Purpose**: Contains navigation and context on desktop.

```html
<div class="col-span-1 bg-white/70 backdrop-blur-3xl rounded-4xl p-8 shadow-soft ring-1 ring-black/5 flex flex-col">
  <!-- Sidebar content -->
</div>
```

#### Navigation List
**Purpose**: List of items in the sidebar, like cards in a deck.

```html
<!-- Default Navigation Item -->
<a href="#" class="
  block 
  p-3 
  rounded-lg 
  text-sm 
  transition-colors 
  text-text-muted
">
  Study Deck
</a>

<!-- Hover State -->
<a href="#" class="
  block 
  p-3 
  rounded-lg 
  text-sm 
  transition-colors 
  hover:bg-subtle-background
">
  Study Deck
</a>

<!-- Active State -->
<a href="#" class="
  block 
  p-3 
  rounded-lg 
  text-sm 
  transition-colors 
  bg-subtle-background 
  text-text-primary 
  font-semibold
">
  Study Deck
</a>
```

### Progress Bar Components
**Purpose**: To show user progress in a course or quiz.

```html
<!-- Progress Bar Container -->
<div class="w-full bg-gray-200 rounded-full h-2">
  <!-- Progress Fill -->
  <div class="bg-accent h-2 rounded-full" style="width: 60%"></div>
</div>

<!-- Alternative with custom width -->
<div class="w-full bg-gray-200 rounded-full h-2">
  <div class="bg-accent h-2 rounded-full transition-all duration-300" style="width: var(--progress-width)"></div>
</div>
```

### Mobile Bottom Tab Bar
**Purpose**: The main navigation bar for the mobile app.

```html
<!-- Bottom Tab Bar Container -->
<nav class="
  fixed 
  bottom-6 
  left-1/2 
  -translate-x-1/2 
  w-[90%] 
  max-w-sm 
  h-[72px] 
  bg-white/80 
  backdrop-blur-2xl 
  rounded-full 
  shadow-soft 
  flex 
  justify-around 
  items-center 
  p-2
">
  <!-- Side Navigation Item -->
  <button class="w-14 h-14 flex items-center justify-center text-text-secondary">
    <svg class="w-6 h-6">...</svg>
  </button>
  
  <!-- Central Action Button -->
  <button class="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-secondary">
    <svg class="w-6 h-6">...</svg>
  </button>
  
  <!-- Side Navigation Item -->
  <button class="w-14 h-14 flex items-center justify-center text-text-secondary">
    <svg class="w-6 h-6">...</svg>
  </button>
</nav>
```

## Animation System

### Blob Animation
```css
animation: {
  "blob": "blob 10s infinite"
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
```

### Usage
```html
<!-- Animated Element -->
<div class="animate-blob">
  Animated Content
</div>

<!-- With custom timing -->
<div class="animate-blob" style="animation-duration: 15s;">
  Slower Animation
</div>
```

## Border Radius System

### Extended Scale
```css
borderRadius: {
  "4xl": "2rem",     // 32px - Large rounded corners
  "5xl": "2.5rem"    // 40px - Extra large rounded corners
}
```

### Usage Patterns
```html
<!-- Large Container -->
<div class="rounded-4xl">Large container</div>

<!-- Extra Large Container (Mobile) -->
<div class="rounded-5xl">Mobile phone container</div>

<!-- Standard Elements -->
<button class="rounded-2xl">Button</button>
<input class="rounded-2xl" />
<div class="rounded-lg">Card</div>
```

## Shadow System

### Soft Shadow
```css
boxShadow: {
  "soft": "0 10px 30px -10px rgba(0, 0, 0, 0.08)"
}
```

### Usage
```html
<!-- Soft elevated elements -->
<div class="shadow-soft">Soft shadow container</div>

<!-- Standard shadows for comparison -->
<div class="shadow-sm">Subtle shadow</div>
<div class="shadow">Standard shadow</div>
<div class="shadow-lg">Strong shadow</div>
```

## Responsive Design Patterns

### Mobile-First Layout
```html
<!-- Mobile: Single column, Desktop: Three columns -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-1">Sidebar</div>
  <div class="lg:col-span-2">Main Content</div>
</div>
```

### Responsive Padding
```html
<!-- Responsive padding scaling -->
<div class="p-6 lg:p-8">
  Content with responsive padding
</div>
```

### Mobile Container Pattern
```html
<!-- Fixed mobile container with overflow -->
<div class="relative w-[390px] h-[844px] bg-secondary rounded-5xl shadow-2xl p-4 overflow-hidden">
  <!-- Mobile app content -->
</div>
```

## Glassmorphism Effects

### Glass Panel
```html
<!-- Frosted glass effect -->
<div class="bg-white/70 backdrop-blur-3xl rounded-4xl p-6 lg:p-8 shadow-soft ring-1 ring-black/5">
  Glass content
</div>
```

### Glass Navigation
```html
<!-- Glass navigation bar -->
<nav class="bg-white/80 backdrop-blur-2xl rounded-full shadow-soft">
  Navigation content
</nav>
```

## Implementation Guidelines

### Development Workflow
1. **Use the defined color palette** consistently across components
2. **Implement the 3D aesthetic** with appropriate shadows and rounded corners
3. **Create glassmorphism effects** where appropriate for modern look
4. **Use the mobile container pattern** for mobile-first responsive design
5. **Apply the blob animation** sparingly for playful elements
6. **Maintain neumorphic-light styling** with soft shadows and subtle borders

### Component Best Practices
- Always use the defined color tokens (primary, secondary, accent, etc.)
- Apply the 4xl and 5xl border radius for modern, rounded aesthetics
- Use the soft shadow for elevated elements to maintain the neumorphic feel
- Implement the glass panel effect for main content areas
- Use the mobile container pattern for mobile applications
- Apply hover effects like scale-105 and border transitions

### Accessibility Considerations
- Ensure proper contrast ratios with the new color palette
- Maintain focus states with ring-accent for interactive elements
- Use semantic HTML elements with the new styling classes
- Test color combinations for readability across all device types

### Performance Considerations
- Use Tailwind's JIT mode for optimal bundle size with custom colors
- Optimize glassmorphism effects for performance on lower-end devices
- Consider reducing blur intensity for mobile performance if needed
- Use transform and transition classes for smooth animations

This EduPlay Modern 3D Design System provides a comprehensive foundation for building engaging, modern, and playful educational applications with a distinctive neumorphic-light aesthetic and 3D-centric design approach.