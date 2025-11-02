
export class DateUtils {
  static SEMESTER_START_DATE = new Date(2025, 7, 26); // August 26, 2025


  static getCurrentHour() {
    return new Date().getHours();

  }

  static getTimeCategory(hour = this.getCurrentHour()) {
    if(hour >= 5 && hour < 12) return "Pagi";
    if(hour >= 12 && hour < 15) return "Siang";
    if(hour >= 15 && hour < 18) return "Sore";
    return "Malam";
  }

  

  // Hitung minggu semester
  static getSemesterWeek(currentDate = new Date()) {
    const weeksDiff = Math.floor(
      (currentDate - this.SEMESTER_START_DATE) / (7 * 24 * 60 * 60 * 1000)
    ) + 1;
    return Math.max(weeksDiff, 1);
  }

  // Format tanggal Indonesia
  static formatIndonesian(date) {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  

  // Format bulan tahun
  static formatMonthYear(date) {
    return date.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    });
  }

  // Cek apakah tanggal adalah hari ini
  static isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  // Cek apakah tanggal dalam minggu ini
  static isThisWeek(date) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    return date >= startOfWeek && date <= endOfWeek;
  }

  // Hitung selisih hari
  static getDaysDifference(fromDate, toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    return Math.ceil((to - from) / (1000 * 60 * 60 * 24));
  }

  // Get hari dalam bulan
  static getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  // Get hari pertama bulan
  static getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  // Generate array tanggal untuk kalender
  static generateCalendarDays(date) {
    const daysInMonth = this.getDaysInMonth(date);
    const firstDay = this.getFirstDayOfMonth(date);
    const days = [];

    // Hari kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Tanggal dalam bulan
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), day));
    }

    return days;
  }

  // Status tugas berdasarkan deadline
  static getTaskStatus(deadline) {
    const today = new Date();
    const taskDate = new Date(deadline);
    const daysDiff = this.getDaysDifference(today, taskDate);

    if (daysDiff < 0) {
      return { status: "overdue", color: "bg-gray-500", text: "Terlambat" };
    }
    if (daysDiff <= 1) {
      return { status: "urgent", color: "bg-red-500", text: "Urgent" };
    }
    if (daysDiff <= 7) {
      return { status: "soon", color: "bg-yellow-500", text: "1 Minggu" };
    }
    if (daysDiff <= 14) {
      return { status: "normal", color: "bg-green-500", text: "2 Minggu" };
    }
    return { status: "future", color: "bg-blue-500", text: "Normal" };
  }

  // Urgency score untuk sorting
  static getTaskUrgencyScore(deadline) {
    if (!deadline) return 999;
    
    const today = new Date();
    const taskDate = new Date(deadline);
    const daysDiff = this.getDaysDifference(today, taskDate);

    if (daysDiff < 0) return 100; // Overdue
    if (daysDiff <= 1) return 1; // Urgent
    if (daysDiff <= 7) return 7; // Within a week
    if (daysDiff <= 14) return 14; // Within 2 weeks
    return 30; // Normal
  }
}