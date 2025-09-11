import { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/admin';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [dashboardStats, setDashboardStats] = useState({});
  const [pendingContent, setPendingContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, contentResponse] = await Promise.all([
        adminService.getDashboard(),
        adminService.getPendingContent()
      ]);
      
      setDashboardStats(statsResponse.data);
      setPendingContent(contentResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveContent = async (contentId) => {
    try {
      await adminService.approveContent(contentId);
      setPendingContent(prev => prev.filter(item => item.id !== contentId));
      await fetchDashboardData(); // Refresh stats
      return true;
    } catch (error) {
      console.error('Error approving content:', error);
      throw error;
    }
  };

  const rejectContent = async (contentId, reason) => {
    try {
      await adminService.rejectContent(contentId, reason);
      setPendingContent(prev => prev.filter(item => item.id !== contentId));
      await fetchDashboardData(); // Refresh stats
      return true;
    } catch (error) {
      console.error('Error rejecting content:', error);
      throw error;
    }
  };

  const refreshDashboard = async () => {
    await fetchDashboardData();
  };

  const value = {
    dashboardStats,
    pendingContent,
    loading,
    approveContent,
    rejectContent,
    refreshDashboard,
    fetchDashboardData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
