# NAK Dashboard Challenge

A modern React dashboard application built for the NAK company code challenge, featuring attributes and products management with a beautiful glassmorphism design.

## 🚀 Features

- **Authentication System**: Sign in/Sign up with persistent login state
- **Attributes Management**: CRUD operations for product attributes with different types (text, number, select, boolean)
- **Products Management**: Full product management with dynamic attributes, pricing, and categorization
- **Modern UI**: Glassmorphism design with EmotionJS styling
- **Network Monitoring**: Real-time connection status with toast notifications
- **Internationalization**: i18n support with React i18next
- **Form Validation**: React Hook Form with comprehensive validation
- **State Management**: Zustand for global state with persistence
- **Responsive Design**: Mobile-friendly interface

## 🛠 Technology Stack

- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: EmotionJS with styled-components approach
- **State Management**: Zustand 5.0.7 with persistence
- **Forms**: React Hook Form 7.62.0
- **Routing**: React Router DOM 7.7.1
- **Internationalization**: React i18next 15.6.1
- **Icons**: Custom SVG icons

## 📋 Requirements Met

### Technical Requirements ✅
- ✅ TypeScript implementation
- ✅ EmotionJS for styling
- ✅ Zustand for state management
- ✅ i18n for internationalization (no direct strings)
- ✅ Vite for build and development
- ✅ React Hook Form for all forms

### Business Requirements ✅
- ✅ Authentication-based routing (public/private pages)
- ✅ Persistent login state (browser reload)
- ✅ Network connection monitoring with toast notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd nak-dashboard-challenge
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📱 Usage

### Authentication
- **Sign Up**: Create a new account with username, password, and confirmation
- **Sign In**: Login with existing credentials
- **Auto-logout**: Session persists across browser reloads

### Attributes Management
- **Create**: Add new attributes with different types (text, number, select, boolean)
- **Edit**: Modify existing attributes including their values
- **Delete**: Remove attributes with confirmation dialog
- **Types**: Support for multiple attribute types with dynamic value management

### Products Management
- **Create**: Add products with name, price, category, description, and status
- **Edit**: Update product information and attributes
- **Delete**: Remove products with confirmation
- **Attributes**: Dynamically assign attribute values based on available attributes
- **Categories**: Predefined categories (Electronics, Clothing, Footwear, etc.)

### Network Monitoring
- Automatic detection of network connectivity
- Toast notifications when connection is lost
- Non-intrusive user experience

## 🎨 Design System

The application features a modern glassmorphism design with:
- **Glass-like containers**: Semi-transparent backgrounds with blur effects
- **Consistent spacing**: Standardized padding and margins
- **Modern typography**: Inter font family with proper weight hierarchy
- **Color scheme**: Neutral grays with accent colors for actions
- **Interactive elements**: Hover effects and smooth transitions
- **Responsive layout**: Mobile-first design approach

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── icons/          # SVG icon components
│   ├── Button.tsx      # Button variants
│   ├── FormElements.tsx # Form input components
│   ├── Modal.tsx       # Modal component
│   ├── Select.tsx      # Custom select component
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Table.tsx       # Data table components
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Translation files
├── layout/             # Layout components
├── pages/              # Page components
├── store/              # Zustand stores
├── styles/             # Global styles
└── App.tsx             # Main application component
\`\`\`

## 🧪 Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture
- Custom hooks for state management

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- Modify \`src/styles/global.ts\` for global styles
- Update \`src/i18n/locales/en.json\` for translations
- Customize components in \`src/components/\` directory

## 📝 Notes

- The application uses localStorage for data persistence
- All text content is internationalized through i18n
- Form validations are implemented using React Hook Form
- Network status is monitored continuously
- State management follows Zustand patterns with persistence

## 🎯 Challenge Completion

This project successfully implements all required features for the NAK company code challenge:

1. ✅ Complete attributes management system
2. ✅ Full products management with dynamic attributes
3. ✅ Modern, responsive UI with glassmorphism design
4. ✅ All technical requirements met (TypeScript, EmotionJS, Zustand, i18n, Vite, React Hook Form)
5. ✅ All business requirements implemented (auth routing, persistent login, network monitoring)
6. ✅ Production-ready build system
7. ✅ Comprehensive documentation

## 🚀 Deployment

The application is ready for deployment on Vercel or any static hosting platform. The build output is optimized and includes all necessary assets.

---

Built with ❤️ for the NAK company code challenge.
