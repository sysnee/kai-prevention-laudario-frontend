import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const date = new Date(selectedDate);
    date.setDate(1);
    return date;
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  const isSelectedDate = (day: number) => {
    return selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const isPastDate = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 text-blue-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {currentMonth.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 text-blue-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {[...padding, ...days].map((day, index) => (
          <div key={index} className="aspect-square p-1">
            {day && (
              <button
                onClick={() =>
                  onDateSelect(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  )
                }
                disabled={isPastDate(day)}
                className={`
                  w-full h-full flex items-center justify-center rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${
                    isSelectedDate(day)
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : isPastDate(day)
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'hover:bg-blue-50 hover:text-blue-600 text-gray-700'
                  }
                `}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}