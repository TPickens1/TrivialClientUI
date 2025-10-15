import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { RaulLiveFeed } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export function RaulLiveData() {
  const [data, setData] = useState<RaulLiveFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { customerId } = useAuth();

  useEffect(() => {
    fetchRaulData();
    const interval = setInterval(() => {
      fetchRaulData();
    }, 3000);

    return () => clearInterval(interval);
  }, [customerId]);

  const fetchRaulData = async () => {
    if (!customerId) return;

    try {
      const { data: fetchedData, error } = await supabase
        .from('raul_live_feed')
        .select('*')
        .eq('customer_id', customerId)
        .order('unit_name', { ascending: true });

      if (error) throw error;
      setData(fetchedData || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching RAUL data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-green-500';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getHealthBg = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent':
        return 'bg-green-50';
      case 'good':
        return 'bg-green-50';
      case 'fair':
        return 'bg-yellow-50';
      case 'poor':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading RAUL data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">RAUL™ Live Data</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">Real-time parking occupancy monitoring</p>
        </div>
        <button
          onClick={fetchRaulData}
          className="bg-[#FFC107] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#FFB300] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
        <div className="text-xs sm:text-sm text-gray-500 mb-3 md:mb-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>

        {data.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
            No RAUL data available. System initialization in progress.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Unit Name</th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Status</th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Space</th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Code</th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Health</th>
                    <th className="text-center py-2 md:py-3 px-2 md:px-4 font-semibold text-black text-xs md:text-sm">Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => {
                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${getHealthBg(row.health)}`}
                      >
                        <td className="py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm">{row.unit_name}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">{row.space}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-center font-mono text-xs">{row.code}</td>
                        <td className={`py-2 md:py-3 px-2 md:px-4 text-center font-semibold text-xs md:text-sm ${getHealthColor(row.health)}`}>
                          {row.health}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">{row.uses_this_month.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4">
        <h3 className="font-semibold text-black mb-2 text-sm md:text-base">Legend</h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-50 border border-green-200 rounded flex-shrink-0"></div>
            <span className="text-gray-700">Excellent/Good Health</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded flex-shrink-0"></div>
            <span className="text-gray-700">Fair Health</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-50 border border-red-200 rounded flex-shrink-0"></div>
            <span className="text-gray-700">Poor Health</span>
          </div>
        </div>
      </div>
    </div>
  );
}
