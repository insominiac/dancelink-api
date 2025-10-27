export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Dance Platform API
        </h1>
        <p className="text-gray-600 mb-6">
          Independent API server is running successfully!
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Available API Routes:
          </h2>
          <ul className="text-left text-sm text-gray-600 space-y-1">
            <li>• <code>/api/payments/*</code> - Payment processing</li>
            <li>• <code>/api/host/*</code> - Host management</li>
            <li>• <code>/api/bookings/*</code> - Booking system</li>
            <li>• <code>/api/instructor/*</code> - Instructor features</li>
            <li>• <code>/api/auth/*</code> - Authentication</li>
            <li>• <code>/api/admin/*</code> - Admin panel</li>
            <li>• <code>/api/user/*</code> - User management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}