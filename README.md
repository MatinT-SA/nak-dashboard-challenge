# NAK Dashboard Challenge

A modern React dashboard application built for the NAK company job application challenge.

## 🚀 Features

- **Authentication System**: Complete sign-in and sign-up functionality
- **Products Management**: Advanced product listing with 6-filter system and SKU management
- **Attributes Management**: Comprehensive attribute management with 3-filter system
- **Real-time Filtering**: Debounced search and instant filtering
- **Network Monitoring**: Automatic network status detection with toast notifications
- **Internationalization**: Full i18n support with react-i18next
- **Responsive Design**: Modern UI with EmotionJS styling
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

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── icons/         # SVG icon components
│   ├── FormElements.tsx
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
│   ├── Attributes.tsx
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── SignIn.tsx
│   └── SignUp.tsx
├── services/          # API services and mock data
│   ├── api.ts
│   └── mockData.ts
├── store/             # Zustand stores
│   ├── authStore.ts
│   ├── attributesStore.ts
│   └── productsStore.ts
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

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Key Requirements Implemented

### Technical Requirements ✅
- [x] **TypeScript**: Entire application built with TypeScript
- [x] **EmotionJS**: All styling done exclusively with EmotionJS
- [x] **Zustand**: State management implemented with Zustand
- [x] **i18n**: No direct strings, all text content internationalized
- [x] **Vite**: Project runs and builds with Vite
- [x] **React Hook Form**: All forms implemented using react-hook-form

### Business Requirements ✅
- [x] **Authentication Flow**: Proper routing based on login status
- [x] **Persistent Login**: User stays logged in after browser reload
- [x] **Network Monitoring**: Continuous network status monitoring with toast notifications

### Design Requirements ✅
- [x] **Products Page**: 6 comprehensive filters (Search, Category, Brand, Status, Price Range, Stock Level)
- [x] **Attributes Page**: 3 targeted filters (Search, Type, Required Status)
- [x] **SKU List**: Complete product listing with all required columns
- [x] **Modern UI**: Clean, professional design matching modern standards

## 🌐 API Integration

The application is designed to work with the NAK Interview API at `https://nak-interview.darkube.app/api`. 

**Development Mode**: Uses Vite proxy for CORS handling
**Production Mode**: Direct API calls to the external endpoint

**Fallback System**: When the API is unavailable, the application automatically falls back to mock data to demonstrate functionality.

## 📱 Features Overview

### Products Management
- **Advanced Filtering**: 6-filter system including search, category, brand, status, price range, and stock level
- **Real-time Search**: Debounced search with instant results
- **SKU Display**: Comprehensive product information display
- **Status Indicators**: Visual status badges for product states

### Attributes Management  
- **Type-based Filtering**: Filter by attribute types (text, number, boolean, date, dropdown)
- **Required Status**: Filter by required/optional attributes
- **Value Display**: Smart value rendering based on attribute type

### User Experience
- **Network Status**: Automatic detection and notification of connection issues
- **Loading States**: Proper loading indicators throughout the application
- **Error Handling**: Graceful error handling with user feedback
- **Responsive Design**: Works seamlessly across different screen sizes

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any static hosting service.

For Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. The build command (`npm run build`) and output directory (`dist`) are pre-configured

## 📄 License

This project is created for the NAK company job application challenge.

---

**Built with ❤️ for NAK Company**
