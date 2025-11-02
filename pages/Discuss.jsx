import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Plus,
  BarChart3,
  Lock,
  FileText,
  Trash2,
  Users,
  Clock,
  CheckCircle,
  X,
  User,
  MessageCircle,
  ArrowLeft,
  Menu,
} from "lucide-react";

const Discuss = () => {
  const [currentUser] = useState({
    id: Math.random().toString(36).substr(2, 9),
    name: `User${Math.floor(Math.random() * 1000)}`,
    color: "#3B82F6",
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const getAvatarColor = (userId) => {
    const colors = [
      "#3B82F6",
      "#EF4444",
      "#10B981",
      "#F59E0B",
      "#8B5CF6",
      "#F97316",
      "#06B6D4",
      "#84CC16",
    ];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const [forums, setForums] = useState([
    {
      id: "1",
      title: "Diskusi Teknologi Terbaru",
      description: "Membahas perkembangan teknologi dan inovasi terkini",
      createdBy: "Admin",
      createdAt: new Date(Date.now() - 3600000),
      isActive: true,
      messages: [
        {
          id: "1",
          text: "Selamat datang di forum diskusi teknologi! Mari kita bahas teknologi terbaru yang sedang trending.",
          sender: "Admin",
          senderId: "admin1",
          timestamp: new Date(Date.now() - 1800000),
        },
        {
          id: "2",
          text: "Menurut kalian, AI seperti ChatGPT akan mengubah cara kerja kita tidak ya?",
          sender: "TechEnthusiast",
          senderId: "user1",
          timestamp: new Date(Date.now() - 1200000),
        },
        {
          id: "3",
          text: "Pastinya! AI sudah mulai mengotomatisasi banyak pekerjaan. Tapi ini juga membuka peluang pekerjaan baru.",
          sender: "DevExpert",
          senderId: "user2",
          timestamp: new Date(Date.now() - 900000),
        },
        {
          id: "4",
          text: "Betul, yang penting kita harus terus belajar dan adaptasi dengan teknologi baru.",
          sender: "StudentIT",
          senderId: "user3",
          timestamp: new Date(Date.now() - 600000),
        },
      ],
      polls: [
        {
          id: "1",
          question:
            "Teknologi mana yang paling menarik untuk dipelajari tahun ini?",
          options: [
            {
              text: "Artificial Intelligence",
              votes: 8,
              voters: ["user1", "user4", "user5"],
            },
            { text: "Blockchain", votes: 3, voters: ["user2"] },
            { text: "Cloud Computing", votes: 5, voters: ["user3", "user6"] },
            { text: "Cybersecurity", votes: 4, voters: ["user7"] },
          ],
          createdBy: "Admin",
          createdAt: new Date(Date.now() - 300000),
          endTime: new Date(Date.now() - 60000),
          isActive: false,
        },
      ],
      conclusion: null,
    },
    {
      id: "2",
      title: "Diskusi Startup & Bisnis",
      description: "Forum untuk membahas ide bisnis dan startup",
      createdBy: "BusinessGuru",
      createdAt: new Date(Date.now() - 7200000),
      isActive: true,
      messages: [
        {
          id: "5",
          text: "Ada yang punya pengalaman memulai startup? Share dong tips-tipsnya!",
          sender: "AspiringFounder",
          senderId: "startup1",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "6",
          text: "Yang terpenting adalah validasi ide dulu sebelum mulai develop produk. Jangan langsung coding!",
          sender: "SerialEntrepreneur",
          senderId: "startup2",
          timestamp: new Date(Date.now() - 2400000),
        },
      ],
      polls: [],
      conclusion: null,
    },
  ]);

  const [activeForumId, setActiveForumId] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [showNewForumModal, setShowNewForumModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showConclusionModal, setShowConclusionModal] = useState(false);
  const [newForumTitle, setNewForumTitle] = useState("");
  const [newForumDescription, setNewForumDescription] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState(5);
  const [conclusionText, setConclusionText] = useState("");

  const messagesEndRef = useRef(null);

  const activeForum = forums.find((f) => f.id === activeForumId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeForum?.messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForums((prevForums) =>
        prevForums.map((forum) => ({
          ...forum,
          polls: forum.polls.map((poll) => {
            if (poll.isActive && new Date() > new Date(poll.endTime)) {
              return { ...poll, isActive: false };
            }
            return poll;
          }),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Close sidebar when forum is selected on mobile
  const selectForum = (forumId) => {
    setActiveForumId(forumId);
    setShowSidebar(false);
  };

  const addForum = () => {
    if (newForumTitle.trim()) {
      const newForum = {
        id: Date.now().toString(),
        title: newForumTitle,
        description: newForumDescription,
        createdBy: currentUser.name,
        createdAt: new Date(),
        isActive: true,
        messages: [],
        polls: [],
        conclusion: null,
      };

      setForums([...forums, newForum]);
      setNewForumTitle("");
      setNewForumDescription("");
      setShowNewForumModal(false);
      setActiveForumId(newForum.id);
      setShowSidebar(false);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && activeForum?.isActive) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: currentUser.name,
        senderId: currentUser.id,
        timestamp: new Date(),
      };

      setForums((prevForums) =>
        prevForums.map((forum) =>
          forum.id === activeForumId
            ? { ...forum, messages: [...forum.messages, message] }
            : forum
        )
      );

      setNewMessage("");
    }
  };

  const deleteMessage = (messageId) => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === activeForumId
          ? {
              ...forum,
              messages: forum.messages.filter((m) => m.id !== messageId),
            }
          : forum
      )
    );
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const createPoll = () => {
    const validOptions = pollOptions.filter((opt) => opt.trim());
    if (pollQuestion.trim() && validOptions.length >= 2) {
      const poll = {
        id: Date.now().toString(),
        question: pollQuestion,
        options: validOptions.map((opt) => ({
          text: opt,
          votes: 0,
          voters: [],
        })),
        createdBy: currentUser.name,
        createdAt: new Date(),
        endTime: new Date(Date.now() + pollDuration * 60000),
        isActive: true,
      };

      setForums((prevForums) =>
        prevForums.map((forum) =>
          forum.id === activeForumId
            ? { ...forum, polls: [...forum.polls, poll] }
            : forum
        )
      );

      setPollQuestion("");
      setPollOptions(["", ""]);
      setPollDuration(5);
      setShowPollModal(false);
    }
  };

  const votePoll = (pollId, optionIndex) => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === activeForumId
          ? {
              ...forum,
              polls: forum.polls.map((poll) => {
                if (
                  poll.id === pollId &&
                  poll.isActive &&
                  !poll.options.some((opt) =>
                    opt.voters.includes(currentUser.id)
                  )
                ) {
                  const newOptions = [...poll.options];
                  newOptions[optionIndex].votes += 1;
                  newOptions[optionIndex].voters.push(currentUser.id);
                  return { ...poll, options: newOptions };
                }
                return poll;
              }),
            }
          : forum
      )
    );
  };

  const closeForum = () => {
    setForums((prevForums) =>
      prevForums.map((forum) =>
        forum.id === activeForumId
          ? { ...forum, isActive: false, conclusion: conclusionText }
          : forum
      )
    );
    setConclusionText("");
    setShowConclusionModal(false);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRemainingTime = (endTime) => {
    const remaining = new Date(endTime) - new Date();
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen bg-slate-50 relative">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative w-80 h-full bg-white border-r border-slate-200 flex flex-col shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-4 lg:p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-800">
                Forum Diskusi
              </h1>
              <p className="text-xs lg:text-sm text-slate-500 mt-1">
                Senin, 21 September 2025
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowNewForumModal(true)}
                className="p-2 lg:p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 text-slate-400 hover:text-slate-600 lg:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: currentUser.color }}
            >
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-500">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 lg:px-4 py-2">
          {forums.map((forum) => (
            <div
              key={forum.id}
              onClick={() => selectForum(forum.id)}
              className={`p-3 lg:p-4 mb-2 rounded-xl cursor-pointer transition-all duration-200 ${
                activeForumId === forum.id
                  ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                  : "hover:bg-slate-50 border-2 border-transparent"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-800 text-sm leading-tight">
                  {forum.title}
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  {!forum.isActive && (
                    <Lock className="w-3.5 h-3.5 text-red-400" />
                  )}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      forum.isActive ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                {forum.description}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{forum.messages.length}</span>
                </div>
                <span>oleh {forum.createdBy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {activeForum ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 lg:py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-base lg:text-lg font-bold text-slate-800 truncate max-w-48 lg:max-w-none">
                      {activeForum.title}
                    </h2>
                    <p className="text-xs lg:text-sm text-slate-600 mt-1 hidden lg:block">
                      {activeForum.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {activeForum.isActive && (
                    <>
                      <button
                        onClick={() => setShowPollModal(true)}
                        className="p-2 lg:p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Buat Polling"
                      >
                        <BarChart3 className="w-4 lg:w-5 h-4 lg:h-5" />
                      </button>
                      <button
                        onClick={() => setShowConclusionModal(true)}
                        className="p-2 lg:p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Tutup Diskusi"
                      >
                        <FileText className="w-4 lg:w-5 h-4 lg:h-5" />
                      </button>
                    </>
                  )}
                  <div
                    className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-semibold ${
                      activeForum.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {activeForum.isActive ? "Aktif" : "Ditutup"}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 lg:px-6 py-3 lg:py-6 space-y-4 lg:space-y-6">
              {/* Conclusion */}
              {activeForum.conclusion && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 lg:p-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-7 lg:w-8 h-7 lg:h-8 bg-amber-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-white" />
                    </div>
                    <span className="font-semibold text-amber-800 text-sm lg:text-base">
                      Kesimpulan Diskusi
                    </span>
                  </div>
                  <p className="text-amber-800 leading-relaxed text-sm lg:text-base">
                    {activeForum.conclusion}
                  </p>
                </div>
              )}

              {/* Polls */}
              {activeForum.polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 lg:p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 lg:w-8 h-7 lg:h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-white" />
                      </div>
                      <span className="font-semibold text-blue-800 text-sm lg:text-base">
                        Polling
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      {poll.isActive ? (
                        <>
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600">
                            {getRemainingTime(poll.endTime)}
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Selesai</span>
                        </>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-4 text-sm lg:text-base">
                    {poll.question}
                  </h4>
                  <div className="space-y-3">
                    {poll.options.map((option, index) => {
                      const totalVotes = poll.options.reduce(
                        (sum, opt) => sum + opt.votes,
                        0
                      );
                      const percentage =
                        totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                      const hasVoted = option.voters.includes(currentUser.id);
                      const canVote =
                        poll.isActive &&
                        !poll.options.some((opt) =>
                          opt.voters.includes(currentUser.id)
                        );

                      return (
                        <div key={index} className="relative">
                          <button
                            onClick={() => canVote && votePoll(poll.id, index)}
                            disabled={!canVote}
                            className={`w-full text-left p-3 lg:p-4 rounded-xl border-2 transition-all duration-200 ${
                              hasVoted
                                ? "bg-blue-100 border-blue-300 shadow-sm"
                                : canVote
                                ? "bg-white border-slate-200 hover:bg-slate-50 hover:border-blue-300 shadow-sm"
                                : "bg-slate-50 border-slate-200 cursor-not-allowed"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-slate-800 text-sm lg:text-base">
                                {option.text}
                              </span>
                              <span className="text-xs lg:text-sm font-semibold text-slate-600">
                                {option.votes} suara
                              </span>
                            </div>
                            {!poll.isActive && (
                              <div>
                                <div className="bg-slate-200 rounded-full h-2 lg:h-2.5 mb-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 lg:h-2.5 rounded-full transition-all duration-700"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-slate-600">
                                  {percentage.toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-200 text-xs text-blue-700">
                    <span>
                      Dibuat oleh {poll.createdBy} •{" "}
                      {formatTime(poll.createdAt)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Messages with WhatsApp-like bubbles */}
              {/* Messages with WhatsApp-like bubbles */}
              {activeForum.messages.map((message) => {
                const isOwnMessage = message.senderId === currentUser.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    } mb-1`}
                  >
                    <div
                      className={`max-w-[85%] lg:max-w-[70%] ${
                        isOwnMessage ? "order-2" : "order-1"
                      }`}
                    >
                      {/* Sender info and time - only for other people's messages */}
                      {!isOwnMessage && (
                        <div className="flex items-center space-x-2 mb-1 ml-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                            style={{
                              backgroundColor: getAvatarColor(message.senderId),
                            }}
                          >
                            <User className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-medium text-slate-600">
                            {message.sender}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      )}

                      {/* Message bubble */}
                      <div
                        className={`relative group  ${
                          isOwnMessage ? "ml-8" : "mr-8"
                        }`}
                      >
                        <div
                          className={`
            px-3 lg:px-4 py-2 lg:py-3 rounded-2xl shadow-sm relative z-10
            ${
              isOwnMessage
                ? "bg-blue-500 text-white rounded-tr-md"
                : "bg-white border border-slate-200 text-slate-700 rounded-tl-md ml-8"
            }
          `}
                        >
                          <p className="text-sm lg:text-base leading-relaxed break-words">
                            {message.text}
                          </p>

                          {/* Time for own messages */}
                          {isOwnMessage && (
                            <div className="flex items-center justify-end mt-1 space-x-1">
                              <span className="text-xs text-blue-100 opacity-75">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          )}

                          {/* Delete button for own messages */}
                          {isOwnMessage && (
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="absolute -top-2 -left-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg z-20"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {activeForum.isActive && (
              <div className="bg-white border-t border-slate-200 p-3 lg:p-6">
                <div className="flex space-x-3 lg:space-x-4 items-end">
                  <div className="flex-1 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 lg:w-8 h-6 lg:h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                        style={{ backgroundColor: currentUser.color }}
                      >
                        <User className="w-3 lg:w-4 h-3 lg:h-4" />
                      </div>
                      <span className="text-xs lg:text-sm font-medium text-slate-600">
                        {currentUser.name}
                      </span>
                    </div>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        (e.preventDefault(), sendMessage())
                      }
                      placeholder="Tulis pesan..."
                      className="flex-1 border-2 border-slate-200 rounded-xl px-3 lg:px-4 py-2 lg:py-3 focus:outline-none focus:border-blue-400 transition-colors resize-none text-sm lg:text-base"
                      rows="1"
                      style={{ minHeight: "40px" }}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2.5 lg:p-3 text-white rounded-xl transition-colors shadow-lg flex-shrink-0 ${
                      newMessage.trim()
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 lg:w-5 h-4 lg:h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 p-4">
            <div className="text-center">
              <Users className="w-12 lg:w-16 h-12 lg:h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-base lg:text-lg font-medium">
                Pilih forum untuk memulai diskusi
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Bergabunglah dalam diskusi yang menarik
              </p>
              <button
                onClick={() => setShowSidebar(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors lg:hidden"
              >
                Lihat Forum
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewForumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 lg:p-6 w-full max-w-md shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-slate-800">
                Buat Forum Baru
              </h3>
              <button
                onClick={() => setShowNewForumModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 lg:w-6 h-5 lg:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul forum"
                value={newForumTitle}
                onChange={(e) => setNewForumTitle(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 text-sm lg:text-base"
              />
              <textarea
                placeholder="Deskripsi forum"
                value={newForumDescription}
                onChange={(e) => setNewForumDescription(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 h-20 lg:h-24 resize-none text-sm lg:text-base"
              />
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowNewForumModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm lg:text-base"
                >
                  Batal
                </button>
                <button
                  onClick={addForum}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm lg:text-base"
                >
                  Buat Forum
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 lg:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-slate-800">
                Buat Polling
              </h3>
              <button
                onClick={() => setShowPollModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 lg:w-6 h-5 lg:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Pertanyaan polling"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 text-sm lg:text-base"
              />
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Pilihan jawaban:
                </label>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Pilihan ${index + 1}`}
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 text-sm lg:text-base"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPollOption}
                  className="w-full p-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Tambah Pilihan
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-slate-700">
                  Durasi:
                </label>
                <select
                  value={pollDuration}
                  onChange={(e) => setPollDuration(Number(e.target.value))}
                  className="border-2 border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value={1}>1 menit</option>
                  <option value={5}>5 menit</option>
                  <option value={10}>10 menit</option>
                  <option value={30}>30 menit</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowPollModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm lg:text-base"
                >
                  Batal
                </button>
                <button
                  onClick={createPoll}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm lg:text-base"
                >
                  Buat Polling
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConclusionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 lg:p-6 w-full max-w-md shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-slate-800">
                Tutup Diskusi
              </h3>
              <button
                onClick={() => setShowConclusionModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 lg:w-6 h-5 lg:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <textarea
                placeholder="Tulis kesimpulan diskusi..."
                value={conclusionText}
                onChange={(e) => setConclusionText(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 h-28 lg:h-32 resize-none text-sm lg:text-base"
              />
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowConclusionModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm lg:text-base"
                >
                  Batal
                </button>
                <button
                  onClick={closeForum}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm lg:text-base"
                >
                  Tutup Diskusi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discuss;
