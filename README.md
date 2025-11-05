# Furniture Manager - Frontend

React + TypeScript + Vite application for managing furniture and providers.

## Features

- View, create, edit, and delete furniture items
- View, create, edit, and delete providers
- Image upload for furniture
- Responsive design with Tailwind CSS
- Type-safe API calls with TypeScript
- Environment-based configuration for production

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your API URL (default: `http://localhost:8000/api/v1`)

3. Make sure the Django backend is running on `http://localhost:8000`

4. Start the development server:
```bash
npm run dev
```

## Backend Requirements

The Django backend must have CORS configured to allow requests from `http://localhost:5173` (Vite's default dev server).

Add to your Django `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Should be at the top
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Allow requests from Vite dev server
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Or for development, allow all origins (not recommended for production):
# CORS_ALLOW_ALL_ORIGINS = True
```

Install django-cors-headers if not already installed:
```bash
pip install django-cors-headers
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar)
├── pages/           # Page components
│   ├── FurnitureList.tsx
│   ├── FurnitureForm.tsx
│   ├── ProviderList.tsx
│   └── ProviderForm.tsx
├── services/        # API services
│   ├── api.ts              # Axios configuration
│   ├── furnitureService.ts
│   └── providerService.ts
├── types/           # TypeScript type definitions
└── App.tsx          # Main app component with routing
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_BASE_URL` - Base URL for the API (default: `http://localhost:8000/api/v1`)

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

Quick production build:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.
