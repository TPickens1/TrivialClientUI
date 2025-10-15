import { useEffect, useState } from 'react';
import { MapPin, Package, User, Phone } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Project } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { customerId } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, [customerId]);

  const fetchProjects = async () => {
    if (!customerId) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black">Project Dashboard</h2>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Overview of all your parking system projects
        </p>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-center">
          <p className="text-sm md:text-base text-gray-500">
            No projects found. Contact support to add your projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-black mb-2 break-words">
                  {project.project_name}
                </h3>
                <div className="flex items-start text-gray-600 mb-1">
                  <MapPin
                    size={16}
                    className="mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm break-words">{project.location}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-3 md:pt-4">
                <div className="flex items-start text-sm text-gray-700">
                  <Package
                    size={16}
                    className="mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="font-medium">Product:</span>
                  <span className="ml-2 break-words">{project.product_type}</span>
                </div>

                <div className="flex items-center text-sm text-gray-700">
                  <Package
                    size={16}
                    className="mr-2 text-[#D4AF37] flex-shrink-0"
                  />
                  <span className="font-medium">Spaces:</span>
                  <span className="ml-2">{project.number_of_spaces}</span>
                </div>

                <div className="flex items-start text-sm text-gray-700">
                  <User
                    size={16}
                    className="mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="font-medium">Contact:</span>
                  <span className="ml-2 break-words">{project.contact_person}</span>
                </div>

                <div className="flex items-start text-sm text-gray-700">
                  <Phone
                    size={16}
                    className="mr-2 text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2 break-words">{project.contact_number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Space Estimator Section */}
      <div className="bg-black text-center rounded-lg shadow-inner py-10 mt-8 border border-[#D4AF37]/40">
        <h3 className="text-xl md:text-2xl font-semibold text-[#D4AF37] mb-4">
          Space Estimator Tool
        </h3>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto px-4">
          Launch our interactive estimator to calculate parking system requirements.  
          Make sure you’re signed into your <strong>@thetrivialcompany.com</strong> account.
        </p>

        <button
          type="button"
          onClick={() => {
            const link = document.createElement('a');
            link.href =
              'https://script.google.com/macros/s/AKfycbzldkPPgWKE_Yc9AffTFmanUwW-2LqhcyrqVmqAfQY1/exec';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.click();
          }}
          className="inline-flex items-center bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 3h7v7m0 0L10 21l-7-7L21 3z"
            />
          </svg>
          Open Space Estimator
        </button>
      </div>
    </div>
  );
}
