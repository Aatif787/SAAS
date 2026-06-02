import { Link } from 'react-router'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="font-display text-[120px] lg:text-[160px] text-[#efe7da] leading-none">
          404
        </h1>
        <h2 className="font-display text-[36px] text-black -mt-8 mb-4">
          Page Not Found
        </h2>
        <p className="font-body text-[16px] text-[#4d4d4d] mb-8 max-w-[400px] mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-lime inline-flex items-center gap-2"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
