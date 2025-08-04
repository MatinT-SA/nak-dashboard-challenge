# NAK Dashboard Challenge

A modern React dashboard application built for the NAK company job application challenge, featuring complete **SKU Management** system based on the actual API specification.

## 🚀 Features

- **SKU Management**: Complete SKU listing and management with real-time filtering
- **Products Management**: Product listing with SKU associations and attributes
- **Attributes Management**: Comprehensive attribute management with name-value pairs
- **Authentication System**: Complete sign-in and sign-up functionality
- **Real-time Filtering**: Debounced search and instant filtering
- **Network Monitoring**: Automatic network status detection with toast notifications
- **Internationalization**: Full i18n support with react-i18next
- **Modern UI Design**: Glass-morphism design with EmotionJS styling
- **Type Safety**: Built with TypeScript for enhanced developer experience

## 🛠 Technical Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: EmotionJS for CSS-in-JS styling
- **State Management**: Zustand for lightweight state management
- **Forms**: React Hook Form for form handling and validation
- **Routing**: React Router DOM for navigation
- **Build Tool**: Vite for fast development and building
- **Internationalization**: i18next and react-i18next
- **Notifications**: React Hot Toast for user feedback

## 🎯 Key Implementation Highlights

### ✅ **SKU Management (Primary Focus)**
Based on the actual NAK API specification:
- **SKU Listing**: Complete SKU display with ID, Model, Price, and Stock
- **Real-time Search**: Filter SKUs by model name or ID
- **Stock Status**: Visual indicators (In Stock, Low Stock, Out of Stock)
- **Price Filtering**: Filter by price ranges
- **Stock Level Filtering**: Filter by stock availability

### ✅ **Products Management**
- **Product Cards**: Modern card-based layout showing product details
- **SKU Associations**: Display linked SKUs for each product
- **Attributes Display**: Show product attributes with name-value pairs
- **Search Functionality**: Filter products by name, ID, or associated SKUs

### ✅ **Attributes Management**
- **Attribute Cards**: Clean card-based display of attributes
- **Values Display**: Visual tags for attribute values
- **Search Functionality**: Filter by attribute names or values

### ✅ **API Integration**
- **Real API Endpoints**: Integrated with actual NAK API at `https://nak-interview.darkube.app/api`
- **Proper Authentication**: JWT token-based authentication
- **Error Handling**: Graceful error handling with user feedback
- **Loading States**: Proper loading indicators throughout

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── icons/         # SVG icon components
│   ├── SearchInput.tsx
│   ├── Select.tsx
│   └── Sidebar.tsx
├── hooks/             # Custom React hooks
│   └── useNetworkStatus.ts
├── i18n/              # Internationalization setup
│   ├── locales/       # Translation files
│   └── index.ts
├── layout/            # Layout components
│   └── Layout.tsx
├── pages/             # Page components
│   ├── Attributes.tsx # Attributes management
│   ├── Dashboard.tsx  # Dashboard overview
│   ├── Products.tsx   # Products with SKU associations
│   ├── SKUs.tsx      # SKU management (Primary)
│   ├── SignIn.tsx
│   └── SignUp.tsx
├── services/          # API services
│   └── api.ts        # NAK API integration
├── store/             # Zustand stores
│   ├── authStore.ts
│   ├── attributesStore.ts
│   ├── productsStore.ts
│   └── skusStore.ts  # SKU management store
├── styles/            # Global styles
│   └── global.ts
└── App.tsx           # Main application component
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd nak-dashboard-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 API Integration

The application is fully integrated with the NAK Interview API:

**Base URL**: `https://nak-interview.darkube.app/api`

### Key Endpoints:
- `GET /skus` - Fetch all SKUs
- `POST /skus` - Create new SKU
- `PATCH /skus/{id}` - Update SKU
- `GET /products` - Fetch products (paginated)
- `GET /attributes` - Fetch attributes
- `POST /auth/login` - User authentication
- `POST /users/register` - User registration

### Authentication:
- JWT Bearer token authentication
- Persistent login state
- Automatic token management

## 🎨 Design Implementation

### Glass-morphism UI:
- **Backdrop blur effects** for modern appearance
- **Gradient backgrounds** throughout the interface
- **Rounded corners** and smooth transitions
- **Card-based layouts** for better content organization

### Professional Styling:
- **Consistent color scheme** with gradient accents
- **Typography hierarchy** for better readability
- **Responsive design** that works on all screen sizes
- **Interactive elements** with hover effects and animations

## 📱 Features Overview

### SKU Management (Core Feature)
- **Complete CRUD operations** via API
- **Advanced filtering** by price range and stock level
- **Real-time search** with debounced input
- **Visual status indicators** for stock levels
- **Professional table layout** with proper formatting

### User Experience
- **Network Status Monitoring** with toast notifications
- **Loading States** for all API operations
- **Error Handling** with user-friendly messages
- **Form Validation** using React Hook Form
- **Internationalization** for global readiness

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any static hosting service.

**Production Build**: Optimized and tested
**API Integration**: Production-ready with proper error handling
**Environment**: Automatically detects development vs production mode

## 📊 API Schema Compliance

The application strictly follows the NAK API schema:

```typescript
// SKU Interface (Primary Entity)
interface SKU {
  id: string;
  model: string;
  price: string;
  numberInStock: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Product Interface
interface Product {
  id: string;
  name: string;
  skusIds: string[];
  attributes: AttrDto[];
  userId?: string;
}

// Attribute Interface
interface Attribute {
  id: string;
  name: string;
  values: string[];
  userId?: string;
}
```

## 📄 Technical Requirements Compliance

### ✅ **All Technical Requirements Met:**
- [x] **TypeScript**: Entire application built with TypeScript
- [x] **EmotionJS**: All styling done exclusively with EmotionJS
- [x] **Zustand**: State management implemented with Zustand
- [x] **i18n**: Complete internationalization, no direct strings
- [x] **Vite**: Project runs and builds with Vite
- [x] **React Hook Form**: All forms implemented using react-hook-form

### ✅ **All Business Requirements Met:**
- [x] **Authentication Flow**: Proper routing based on login status
- [x] **Persistent Login**: User stays logged in after browser reload
- [x] **Network Monitoring**: Continuous network status monitoring with toast notifications

---

**Built with ❤️ for NAK Company - Featuring Complete SKU Management System**
