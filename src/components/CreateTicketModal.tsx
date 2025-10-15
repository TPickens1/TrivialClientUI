import { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface CreateTicketModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTicketModal({ onClose, onSuccess }: CreateTicketModalProps) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      const imageUrls: string[] = [];

      // ✅ Upload images if any
      if (images.length > 0) {
        // Confirm active user session
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !currentUser) {
          throw new Error('User not authenticated');
        }

        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
          const filePath = `${currentUser.id}/${fileName}`;

          // Upload to your existing private bucket
          const { error: uploadError } = await supabase.storage
            .from('support-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          // Generate a signed URL valid for 24 hours
          const { data: signed, error: signedError } = await supabase.storage
            .from('support-images')
            .createSignedUrl(filePath, 60 * 60 * 24);

          if (signedError) throw signedError;

          imageUrls.push(signed.signedUrl);
        }
      }

      // ✅ Insert support ticket record
      const { error: insertError } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject,
          description,
          images: imageUrls,
          status: 'open',
        });

      if (insertError) throw insertError;

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Create Support Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
              required
              placeholder="Brief summary of the issue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] min-h-[100px] sm:min-h-[120px]"
              required
              placeholder="Describe your issue in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload size={32} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload images
                </span>
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-3 space-y-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-2 sm:px-3 py-2 rounded gap-2"
                  >
                    <span className="text-xs sm:text-sm text-gray-700 truncate flex-1 min-w-0">{image.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC107] text-black font-semibold py-2 px-4 rounded-md hover:bg-[#FFB300] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
}
