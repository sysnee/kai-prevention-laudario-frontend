"use client";

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, LayoutList, PlusIcon } from 'lucide-react';
import { AppointmentList } from '../../components/scheduling/AppointmentList';
import { AppointmentDashboard } from '../../components/scheduling/AppointmentDashboard';
import { CalendarView } from '../../components/scheduling/CalendarView';
import { Button } from '@mui/material';
import { useTheme } from '@mui/system';

export default function SchedulingList() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [loading, setLoading] = useState(true);

    const theme = useTheme()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [selectedDate]);

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(newDate);
        setLoading(true);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(newDate);
        setLoading(true);
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-kai-gray-900">
                    Consulta de Agendamentos
                </h1>

                <Button
                    href='/dashboard/agendamentos/novo'
                    className="flex items-center px-4 py-2 rounded-lg bg-kai-primary hover:bg-kai-primary/70"
                    style={{
                        color: theme.palette.mode === 'light' ? "#fff" : "#000",
                    }}
                    startIcon={<PlusIcon />}>
                    Novo Agendamento
                </Button>
            </div>

            <AppointmentDashboard
                date={selectedDate}
                loading={loading}
            />

            <div className="mt-8 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handlePrevDay}
                            className="p-2 hover:bg-kai-primary/10 rounded-full"
                        >
                            <ChevronLeft className="w-5 h-5 text-kai-primary" />
                        </button>
                        <div
                            className="flex items-center px-4 py-2 rounded-lg"
                            style={{
                                border: theme.palette.mode === 'light' ? "1px solid #e5e7eb" : "1px solid #333b4d"
                            }}
                        >
                            <CalendarIcon className="w-5 h-5 text-kai-primary mr-2" />
                            <span className="font-medium">
                                {selectedDate.toLocaleDateString('pt-BR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <button
                            onClick={handleNextDay}
                            className="p-2 hover:bg-kai-primary/10 rounded-full"
                        >
                            <ChevronRight className="w-5 h-5 text-kai-primary" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div
                            className="flex rounded-lg p-1 gap-2"
                            style={{
                                border: theme.palette.mode === 'light' ? "1px solid #e5e7eb" : "1px solid #333b4d"
                            }}
                        >
                            <button
                                onClick={() => setView('list')}
                                className={`px-3 py-1 rounded flex items-center ${view === 'list'
                                    ? 'bg-kai-primary/10 text-kai-primary'
                                    : 'text-gray-600 hover:bg-kai-primary/10'
                                    }`}
                            >
                                <LayoutList className="w-5 h-5 mr-2" />
                                Lista
                            </button>
                            <button
                                onClick={() => setView('calendar')}
                                className={`px-3 py-1 rounded flex items-center ${view === 'calendar'
                                    ? 'bg-kai-primary/10 text-kai-primary'
                                    : 'text-gray-600 hover:bg-kai-primary/10'
                                    }`}
                            >
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                Calendário
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {view === 'calendar' ? (
                <CalendarView
                    date={selectedDate}
                />
            ) : (
                <AppointmentList
                    date={selectedDate}
                />
            )}
        </div>
    );
}