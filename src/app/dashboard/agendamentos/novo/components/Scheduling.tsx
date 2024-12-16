'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { ExamSelector } from './ExamSelector';
import { Calendar } from './Calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateTimeSlots } from '@/src/app/utils/temp';
import { createAppointment, ExamTypeEnum } from '@/src/lib/appoinment';
import { TimeSlotPicker } from '@/src/app/components/scheduling/TimeSlotPicker';
import { PatientForm } from '@/src/app/components/scheduling/PatientForm';

type Step = 'exam' | 'date' | 'time' | 'patient' | 'confirmation';

export function Scheduling() {
  const [currentStep, setCurrentStep] = useState<Step>('exam');
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<Array<{ time: string; available: boolean }>>([]);
  const [patientData, setPatientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps: { [key in Step]: { title: string; subtitle: string } } = {
    exam: {
      title: 'Selecione o Pacote',
      subtitle: 'Escolha os tipos de exames'
    },
    date: {
      title: 'Escolha a Data',
      subtitle: 'Selecione a data desejada para o exame'
    },
    time: {
      title: 'Horário Disponível',
      subtitle: 'Escolha um horário'
    },
    patient: {
      title: 'Dados do Paciente',
      subtitle: 'Preencha as informações do paciente'
    },
    confirmation: {
      title: 'Confirmação',
      subtitle: 'Revise e confirme seu agendamento'
    }
  };

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setIsLoading(true);
    try {
      const slots = generateTimeSlots()
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error loading time slots:', error);
      toast.error('Erro ao carregar horários disponíveis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['exam', 'date', 'time', 'patient', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleNextIsEnabled = useMemo(() => {
    switch (currentStep) {
      case 'exam':
        return selectedExam !== null;
      case 'date':
        return selectedDate !== null;
      case 'time':
        return selectedTime !== null;
      case 'patient':
        return patientData !== null;
      case 'confirmation':
        return true;
      default:
        return false;
    }
  }, [currentStep, patientData, selectedExam, selectedDate, selectedTime])

  const handleBack = () => {
    const stepOrder: Step[] = ['exam', 'date', 'time', 'patient', 'confirmation'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedExam || !selectedDate || !selectedTime || !patientData) {
      toast.error('Por favor, preencha todos os dados necessários');
      return;
    }

    setIsLoading(true);
    try {
      // const response = await createAppointment({
      //   examType: ExamTypeEnum.HI_AEROS,
      //   date: '',
      //   hour: 8,
      //   minute: 0,
      // });

      // if (!response.success) {
      //   throw new Error('Falha ao criar agendamento');
      // }

      // Send confirmation email with links to anamnesis and consent forms
      // await sendConfirmationEmail({
      //   email: patientData.email,
      //   name: patientData.name,
      //   examName: selectedExam.name,
      //   date: selectedDate,
      //   time: selectedTime,
      //   anamnesisLink: `https://your-domain.com/anamnesis/${response.appointmentId}`,
      //   consentLink: `https://your-domain.com/consent/${response.appointmentId}`
      // });

      // Show success message
      toast.success('Agendamento realizado com sucesso! Verifique seu email para preencher os formulários necessários.');

      // Redirect to confirmation page or list
      // window.location.href = '/agendamento-consulta';
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Erro ao criar agendamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'exam':
        return (
          <ExamSelector
            selectedExam={selectedExam}
            onExamSelect={(exam) => {
              setSelectedExam(exam);
              // handleNext();
            }}
          />
        );
      case 'date':
        return (
          <Calendar
            selectedDate={selectedDate || new Date()}
            onDateSelect={(date) => {
              handleDateSelect(date);
              // handleNext();
            }}
          />
        );
      case 'time':
        return (
          <TimeSlotPicker
            slots={timeSlots}
            selectedTime={selectedTime}
            onTimeSelect={(time) => {
              setSelectedTime(time);
              // handleNext();
            }}
            isLoading={isLoading}
          />
        );
      case 'patient':
        return (
          <PatientForm
            onSubmit={(data) => {
              setPatientData(data);
              // handleNext();
            }}
          />
        );
      case 'confirmation':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo do Agendamento</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Exame</p>
                <p className="font-medium">{selectedExam?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data e Horário</p>
                <p className="font-medium">
                  {selectedDate?.toLocaleDateString('pt-BR')} às {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Paciente</p>
                <p className="font-medium">{patientData?.name}</p>
                <p className="text-sm text-gray-600">{patientData?.email}</p>
                <p className="text-sm text-gray-600">{patientData?.phone}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Após a confirmação, você receberá um email com links para preencher:
                </p>
                <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                  <li>Questionário de Anamnese</li>
                  <li>Termo de Consentimento</li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full mt-6 px-4 py-2 bg-kai-primary text-white rounded-lg hover:bg-kai-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Confirmando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {steps[currentStep].title}
        </h1>
        <p className="mt-2 text-gray-600">
          {steps[currentStep].subtitle}
        </p>
      </div>

      {renderStepContent()}

      <div className="mt-8 flex justify-between">
        {currentStep !== 'exam' && (
          <button
            onClick={handleBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </button>
        )}
        {currentStep !== 'confirmation' && (
          <button
            disabled={!handleNextIsEnabled}
            style={{
              opacity: handleNextIsEnabled ? 1 : 0.4,
              cursor: handleNextIsEnabled ? 'pointer' : 'not-allowed',
            }}

            onClick={handleNext}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 ml-auto"
          >
            Próximo
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}