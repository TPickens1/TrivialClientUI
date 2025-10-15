import { useState } from 'react';
import { CheckCircle, XCircle, Database } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function ConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    connection: boolean | null;
    customerInfoRead: boolean | null;
    projectsRead: boolean | null;
    raulDataRead: boolean | null;
    error?: string;
  }>({
    connection: null,
    customerInfoRead: null,
    projectsRead: null,
    raulDataRead: null,
  });

  const runTests = async () => {
    setTesting(true);
    const newResults = {
      connection: false,
      customerInfoRead: false,
      projectsRead: false,
      raulDataRead: false,
      error: undefined as string | undefined,
    };

    try {
      const { data: authData, error: authError } = await supabase.auth.getSession();
      if (authError) throw authError;
      newResults.connection = true;

      const { data: customerData, error: customerReadError } = await supabase
        .from('customer_info')
        .select('*')
        .limit(1);
      newResults.customerInfoRead = !customerReadError;

      const { data: projectsData, error: projectsReadError } = await supabase
        .from('projects')
        .select('*')
        .limit(1);
      newResults.projectsRead = !projectsReadError;

      const { data: raulData, error: raulReadError } = await supabase
        .from('raul_live_feed')
        .select('*')
        .limit(1);
      newResults.raulDataRead = !raulReadError;
    } catch (error: any) {
      newResults.error = error.message;
    }

    setResults(newResults);
    setTesting(false);
  };

  const renderStatus = (status: boolean | null) => {
    if (status === null) return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
    if (status) return <CheckCircle size={20} className="text-green-600" />;
    return <XCircle size={20} className="text-red-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database size={24} className="text-[#FFC107]" />
          <h3 className="text-xl font-semibold text-black">Database Connection Test</h3>
        </div>
        <button
          onClick={runTests}
          disabled={testing}
          className="bg-[#FFC107] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#FFB300] transition-colors disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Run Tests'}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span className="text-gray-700">Supabase Connection</span>
          {renderStatus(results.connection)}
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span className="text-gray-700">customer_info Table - Read</span>
          {renderStatus(results.customerInfoRead)}
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span className="text-gray-700">projects Table - Read</span>
          {renderStatus(results.projectsRead)}
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span className="text-gray-700">raul_live_feed Table - Read</span>
          {renderStatus(results.raulDataRead)}
        </div>
      </div>

      {results.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">{results.error}</p>
        </div>
      )}

      {!testing && results.connection !== null && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            {results.connection && results.customerInfoRead && results.projectsRead && results.raulDataRead
              ? 'All tests passed! Your Supabase connection is working correctly.'
              : 'Some tests failed. Please check your database tables and permissions.'}
          </p>
        </div>
      )}
    </div>
  );
}
