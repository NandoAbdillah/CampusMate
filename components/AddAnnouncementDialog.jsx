import React, { useState } from 'react';
// Sesuaikan dengan path Anda
import { Plus, X, Calendar, Link, AlertTriangle, Info, Megaphone } from 'lucide-react';
import { useAuth } from '@/utils/AuthContext';
import { AnnouncementController } from '@/lib/AnnouncementController';

const AddAnnouncementDialog = () => {
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'news',
    priority: 'normal',
    shortDescription: '',
    fullContent: '',
    link: '',
    calendarReminderDate: '',
    calendarReminderTime: '',
  });

  const categories = [
    { value: 'important', label: 'Penting', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'news', label: 'Berita', icon: Info, color: 'text-blue-600' },
    { value: 'other', label: 'Lainnya', icon: Megaphone, color: 'text-gray-600' }
  ];

  const priorities = [
    { value: 'urgent', label: 'Mendesak', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'news',
      priority: 'normal',
      shortDescription: '',
      fullContent: '',
      link: '',
      calendarReminderDate: '',
      calendarReminderTime: '',
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Validasi form
      if (!formData.title.trim() || !formData.shortDescription.trim() || !formData.fullContent.trim()) {
        alert('Harap isi semua field yang wajib');
        setLoading(false);
        return;
      }

      // Prepare data for Firebase
      const announcementData = {
        title: formData.title.trim(),
        category: formData.category,
        priority: formData.priority,
        shortDescription: formData.shortDescription.trim(),
        fullContent: formData.fullContent.trim(),
        link: formData.link.trim() || null,
        calendarReminder: (formData.calendarReminderDate && formData.calendarReminderTime) ? {
          date: formData.calendarReminderDate,
          time: formData.calendarReminderTime,
        } : null,
        reactions: [],
        comments: [],
        author: user?.name || user?.displayName || 'Admin',
      };

      // Submit ke Firebase
      const result = await AnnouncementController.createAnnouncement(announcementData, user.userId);
      
      console.log('Announcement created successfully:', result);
      alert('Pengumuman berhasil dibuat!');
      
      // Reset form dan tutup dialog
      resetForm();
      setIsOpen(false);

    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Gagal membuat pengumuman: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hanya tampilkan button jika user adalah admin
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      {/* Add Announcement Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <Plus size={20} />
        Tambah Pengumuman
      </button>

      {/* Dialog Overlay */}
      
      {isOpen && (
        <div className="fixed inset-0 bg-gray-100/30 backdrop-blur-md z-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus size={24} />
                Tambah Pengumuman Baru
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetForm();
                }}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Pengumuman *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="Masukkan judul pengumuman..."
                    required
                  />
                </div>

                {/* Category and Priority Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioritas *
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                      required
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi Singkat *
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="Ringkasan singkat pengumuman..."
                    required
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Konten Lengkap *
                  </label>
                  <textarea
                    name="fullContent"
                    value={formData.fullContent}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical text-gray-800"
                    placeholder="Tulis konten lengkap pengumuman di sini..."
                    required
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Link size={16} />
                    Link Tambahan (Opsional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="https://contoh.com"
                  />
                </div>

                {/* Calendar Reminder */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar size={16} />
                    Pengingat Kalender (Opsional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Tanggal</label>
                      <input
                        type="date"
                        name="calendarReminderDate"
                        value={formData.calendarReminderDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Waktu</label>
                      <input
                        type="time"
                        name="calendarReminderTime"
                        value={formData.calendarReminderTime}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 "
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    disabled={loading}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:from-blue-600 disabled:hover:to-purple-600 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Menyimpan...
                      </>
                    ) : (
                      'Buat Pengumuman'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAnnouncementDialog;