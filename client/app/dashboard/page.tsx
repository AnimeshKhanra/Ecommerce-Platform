import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center">
        Dashboard Protected Page
      </div>
    </ProtectedRoute>
  );
}