import { useEffect, useState } from 'react';
import { Plus, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { SupportTicket } from '../types/database';
import { useAuth } from '../contexts/AuthContext';
import { CreateTicketModal } from './CreateTicketModal';

export function SupportTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    setDeletingId(ticketId);

    try {
      const { error } = await supabase
        .from('support_tickets')
        .delete()
        .eq('id', ticketId);

      if (error) throw error;

      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Failed to delete ticket. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Clock size={16} className="text-blue-600" />;
      case 'in progress':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">Support Tickets</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your support requests and track their progress</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#FFC107] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#FFB300] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          New Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-center">
          <p className="text-sm md:text-base text-gray-500">No support tickets yet. Create one to get help from our team.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(ticket.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    disabled={deletingId === ticket.id}
                    className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                    title="Delete ticket"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-base md:text-lg font-semibold text-black mb-2 break-words">{ticket.subject}</h3>
              <p className="text-sm md:text-base text-gray-700 mb-4 break-words">{ticket.description}</p>

              {ticket.images && ticket.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {ticket.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Attachment ${index + 1}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateTicketModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchTickets();
          }}
        />
      )}
    </div>
  );
}
