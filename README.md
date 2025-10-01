# TeaShop Project

A modern tea e-commerce application built with React and Node.js.

## Project Structure

```
project/
├── backend/                 # Node.js Express server
│   ├── app.js              # Express application setup
│   ├── server.js           # Server startup file
│   ├── package.json        # Backend dependencies
│   ├── data/
│   │   └── products.json   # Product data
│   ├── routes/
│   │   └── products.js     # Product API routes
│   └── services/
│       └── products.js     # Product business logic
└── frontend/               # React application
    ├── src/
    │   ├── components/     # Reusable components
    │   │   ├── Navbar.tsx
    │   │   └── ProductCard.tsx
    │   ├── pages/          # Page components
    │   │   ├── Home.tsx
    │   │   └── Products.tsx
    │   ├── types/          # TypeScript type definitions
    │   │   └── index.ts
    │   ├── styles/         # Global styles
    │   │   └── globals.css
    │   ├── App.tsx         # Main app component
    │   └── main.tsx        # App entry point
    ├── package.json        # Frontend dependencies
    └── index.html          # HTML template
```

## Features

- 🍵 Modern tea product catalog
- 🎨 Clean, minimalist design with custom styling
- 📱 Responsive layout with 4-column product grid
- 🔍 Product search and filtering capabilities
- 🛒 Add to cart functionality (UI ready)
- 🌐 RESTful API with full CRUD operations
- 🎯 TypeScript for type safety

## Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Chakra UI** - Component library for consistent UI
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Cookie Parser** - Cookie parsing middleware

### Styling
- **Chakra UI** - Primary component library
- **Custom CSS** - Global styles and design system
- **Google Fonts** - Montserrat, Open Sans, Roboto Flex, Kantumruy Pro

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Development

1. Start the backend server:
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/filter?category=tea&minPrice=10` - Filter products

## Design System

### Colors
- **Primary**: #4F493F (Warm brown/taupe)
- **Background**: #F7FAFC (Light gray)
- **Text Primary**: #1A202C (Dark gray)
- **Text Secondary**: #718096 (Medium gray)

### Typography
- **Primary Font**: Montserrat (headings, UI text)
- **Price Font**: Open Sans Light 300
- **System Fonts**: Roboto Flex, Kantumruy Pro

### Layout
- **Grid**: 4 columns with 10px gaps
- **Card Width**: Max 200px, responsive
- **Container**: Centered with max-width 1000px

## Project Status

✅ **Completed Features:**
- Backend API with full CRUD operations
- Frontend React application with routing
- Product display with modern card design
- Responsive 4-column grid layout
- Custom styling system with design tokens
- TypeScript type definitions
- CORS configuration for development

🚧 **In Progress:**
- Add to cart functionality
- User authentication
- Product categories
- Search and filtering UI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.