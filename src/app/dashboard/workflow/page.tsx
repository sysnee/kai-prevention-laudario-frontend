"use client";

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { WorkflowMetrics } from '../../components/workflow/WorkflowMetrics';
import { WorkflowBoard } from '../../components/workflow/WorkflowBoard';
import WorkflowSkeleton from '@/src/app/components/workflow/WorkflowSkeleton';
import api from '@/src/lib/api';
import WorkflowMetricsSkeleton from '@/src/app/components/workflow/WorkflowMetricsSkeleton'

export default function Workflow() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStatus] = useState<string | null>(null);
  const [plannedList, setPlannedList] = useState([])
  const [waitingList, setWaitingList] = useState([])
  const [startedList, setStartedList] = useState([])
  const [inRevision, setInRevision] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchWorkflowData() {
    try {
      setIsLoading(true)
      const [planned, waiting, started, revision] = await Promise.all([
        api.get('service-requests?status=PLANNED&limit=20'),
        api.get('service-requests?status=WAITING&limit=20'),
        api.get('service-requests?status=STARTED&limit=20'),
        api.get('service-requests?status=IN_REVISION&limit=20')
      ])

      setPlannedList(planned.data)
      setWaitingList(waiting.data)
      setStartedList(started.data)
      setInRevision(revision.data)
    } catch (error) {
      console.error('Erro ao carregar dados do workflow:', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchWorkflowData()
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-kai-gray-900">Fluxo de Trabalho</h1>

        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar exames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-kai-gray-50 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent"
            />
            <Search className="w-5 h-5 text-kai-gray-900 absolute left-3 top-2.5" />
          </div>

          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-kai-gray-50 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent"
          />

          <button className="px-4 py-2 border border-kai-gray-50 rounded-lg flex items-center text-kai-gray-900 hover:bg-kai-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <>
            <WorkflowMetricsSkeleton />
            <WorkflowSkeleton />
          </>
        ) : (
          <>
            <WorkflowMetrics date={selectedDate} total={plannedList.length} />
            <WorkflowBoard
              planned={plannedList}
              waiting={waitingList}
              started={startedList}
              on_hold={[]}
              completed={[]}
              transcription={[]}
              signed={[]}
              canceled={[]}
              in_revision={inRevision}
              searchQuery={searchQuery}
              selectedStatus={selectedStatus}
              selectedDate={selectedDate}
            />
          </>
        )}
      </div>
    </div>
  );
}
