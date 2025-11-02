import { AnnouncementController } from "@/lib/AnnouncementController";
import {
  User,
  Clock,
  Calendar,
  Link2 as LinkIcon,
  MessageCircle,
  X,
  ExternalLink,
  AlertTriangle,
  Info,
  FileText,
  Send,
  ArrowUpDown,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const AnnouncementCard = ({ announcement, onClick }) => {
  const getCategoryConfig = (category, priority) => {
    if (priority === "urgent") {
      return {
        bgColor: "bg-red-100",
        icon: AlertTriangle,
        borderColor: "border-red-300",
        textColor: "text-red-700",
        categoryName: "URGENT",
        pulseColor: "bg-red-500",
      };
    }

    switch (category) {
      case "important":
        return {
          bgColor: "bg-orange-100",
          icon: Info,
          borderColor: "border-orange-300",
          textColor: "text-orange-700",
          categoryName: "Important",
          pulseColor: "bg-orange-500",
        };
      case "news":
        return {
          bgColor: "bg-blue-100",
          icon: FileText,
          borderColor: "border-blue-300",
          textColor: "text-blue-700",
          categoryName: "News",
          pulseColor: "bg-blue-500",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          icon: FileText,
          borderColor: "border-gray-300",
          textColor: "text-gray-700",
          categoryName: "Other",
          pulseColor: "bg-gray-500",
        };
    }
  };

  const config = getCategoryConfig(
    announcement.category,
    announcement.priority
  );
  const Icon = config.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border-2 ${config.borderColor} relative h-48 flex flex-col`}
      onClick={() => onClick(announcement)}
    >
      {announcement.priority === "urgent" && (
        <div className="absolute top-2 right-2 flex items-center">
          <div
            className={`w-3 h-3 ${config.pulseColor} rounded-full animate-pulse`}
          ></div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <div
          className={`${config.bgColor} rounded-lg p-3 mb-3 flex items-center justify-between relative flex-shrink-0`}
        >
          <Icon className={config.textColor} size={24} />
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${config.textColor} bg-white/50`}
          >
            {config.categoryName}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 mb-2 leading-tight text-sm md:text-base line-clamp-2 flex-shrink-0">
          {announcement.title}
        </h3>

        <p className="text-gray-600 text-xs mb-3 line-clamp-3 flex-1">
          {announcement.shortDescription}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <span className="truncate pr-2">{announcement.author}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {announcement.calendarReminder &&
              announcement.priority === "urgent" && (
                <div className="flex items-center gap-1 text-red-600">
                  <Clock size={12} />
                  <span>
                    {formatDate(
                      announcement.calendarReminder.date +
                        " " +
                        announcement.calendarReminder.time
                    )}
                  </span>
                </div>
              )}
            <span>{formatDate(announcement.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementModal = ({ announcement, isOpen, onClose }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  // Initialize comments when modal opens
  React.useEffect(() => {
    if (isOpen && announcement) {
      setComments(announcement.comments || []);
    }
  }, [isOpen, announcement]);

  if (!isOpen || !announcement) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Current User",
        date: new Date().toISOString(),
        content: newComment.trim(),
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 5);

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto md:max-h-[80vh]">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {announcement.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {announcement.author}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFullDate(announcement.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  announcement.priority === "urgent"
                    ? "bg-red-100 text-red-700"
                    : announcement.category === "important"
                    ? "bg-orange-100 text-orange-700"
                    : announcement.category === "news"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {announcement.priority === "urgent"
                  ? "URGENT"
                  : announcement.category === "important"
                  ? "Important"
                  : announcement.category === "news"
                  ? "News"
                  : "Other"}
              </span>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed">
              {announcement.fullContent}
            </p>
          </div>

          {announcement.link && (
            <div className="mb-6">
              <a
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <LinkIcon size={16} />
                View Details
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {announcement.calendarReminder && (
            <div className="mb-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <Calendar size={16} />
                <span className="font-medium">Reminder Set:</span>
                <span>
                  {formatFullDate(
                    announcement.calendarReminder.date +
                      " " +
                      announcement.calendarReminder.time
                  )}
                </span>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <MessageCircle size={16} />
                Comments ({comments.length})
              </h4>

              <form onSubmit={handleAddComment} className="mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                {visibleComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFullDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {comments.length > 5 && !showAllComments && (
                  <button
                    onClick={() => setShowAllComments(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Load more comments ({comments.length - 5} remaining)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementSystem = () => {
  // ✅ DIPINDAHKAN KE DALAM KOMPONEN
  const [announcements, setAnnouncements] = useState([]);
  const [sortedAnnouncements, setSortedAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortNewest, setSortNewest] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await AnnouncementController.getAll();
        setAnnouncements(data || []);
      } catch (error) {
        console.error("Terjadi error pada data: ", error);
        setError("Failed to load announcements");
        setAnnouncements([]); // Set array kosong jika error
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // ✅ SORTING LOGIC - Terpisah dari fetch
  useEffect(() => {
    if (announcements.length > 0) {
      const sorted = [...announcements].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortNewest ? dateB - dateA : dateA - dateB;
      });
      setSortedAnnouncements(sorted);
    }
  }, [announcements, sortNewest]); // Dependency pada announcements dan sortNewest

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ EMPTY STATE
  if (sortedAnnouncements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No announcements available</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Teratas</h2>
          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowUpDown size={18} />
            <span className="text-sm cursor-pointer">
              {sortNewest ? "Paling Baru" : "Paling Lama"}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <AnnouncementModal
        announcement={selectedAnnouncement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AnnouncementSystem;