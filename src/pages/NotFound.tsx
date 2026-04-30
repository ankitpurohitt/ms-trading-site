import  { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    // Log the error so you can see if people are following broken links
    console.error("404 Error: Path not found ->", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-2xl border border-slate-200">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          The page you are looking for at <span className="font-mono text-blue-500">{location.pathname}</span> doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Return to Home Page
        </Link>
        
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">M.S. TRADING CO.</p>
        </div>
      </div>
    </div>
  );
}