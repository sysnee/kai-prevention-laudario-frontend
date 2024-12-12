import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  isLoading?: boolean;
}

export function TimeSlotPicker({
  slots,
  selectedTime,
  onTimeSelect,
  isLoading = false,
}: TimeSlotPickerProps) {
  const morningSlots = slots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour < 12;
  });

  const afternoonSlots = slots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= 12;
  });

  const renderTimeSlots = (slots: TimeSlot[]) => (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => slot.available && onTimeSelect(slot.time)}
          disabled={!slot.available || isLoading}
          className={`
            p-3 rounded-lg text-sm font-medium transition-all duration-200
            ${
              selectedTime === slot.time
                ? 'bg-kai-primary text-white shadow-md scale-105'
                : slot.available
                ? 'bg-gray-50 hover:bg-kai-gray-50 hover:text-kai-primary text-gray-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
          <Clock className="w-5 h-5 mr-2 text-kai-primary" />
          Carregando horários...
        </h3>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
          <Clock className="w-5 h-5 mr-2 text-kai-primary" />
          Horários Disponíveis
        </h3>
        <p className="text-gray-500 text-center py-4">
          Nenhum horário disponível para esta data.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
        <Clock className="w-5 h-5 mr-2 text-kai-primary" />
        Horários Disponíveis
      </h3>
      
      {morningSlots.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Manhã</h4>
          {renderTimeSlots(morningSlots)}
        </div>
      )}
      
      {afternoonSlots.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Tarde</h4>
          {renderTimeSlots(afternoonSlots)}
        </div>
      )}
    </div>
  );
}