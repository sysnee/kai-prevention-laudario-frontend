export const serviceExams = {
    'HI-LIGHT': [
        {
            name: 'Ressonância de Corpo Inteiro',
            room: 'Sala 02',
            status: 'PENDING'
        }
    ],
    'HI-AEROS': [
        {
            name: 'Ressonância corpo inteiro',
            room: 'Sala 01',
            status: 'PENDING'
        },
        {
            name: 'Tomografia do Torax',
            room: 'Sala 05',
            status: 'PENDING'
        }
    ],
    'HI-FOCUS': [
        {
            name: 'Tomografia do Torax',
            room: 'Sala 03',
            status: 'PENDING'
        },
        {
            name: 'Angiotomografia Coronária',
            room: 'Sala 04',
            status: 'PENDING'
        },
        {
            name: 'Ecocardiograma',
            room: 'Sala 06',
            status: 'PENDING'
        },
        {
            name: 'Mamografia',
            room: 'Sala 07',
            status: 'PENDING'
        }
    ],
    'HI-DEEP': [
        {
            name: 'Ressonância corpo inteiro',
            room: 'Sala 01',
            status: 'PENDING'
        },
        {
            name: 'Tomografia do Torax',
            room: 'Sala 03',
            status: 'PENDING'
        },
        {
            name: 'Angiotomografia Coronária',
            room: 'Sala 04',
            status: 'PENDING'
        },
        {
            name: 'Ecocardiograma',
            room: 'Sala 06',
            status: 'PENDING'
        },
        {
            name: 'Mamografia',
            room: 'Sala 07',
            status: 'PENDING'
        }
    ]
}

export const stages = [
    { id: 'PLANNED', label: 'Planejado' },
    { id: 'WAITING', label: 'Aguardando' },
    { id: 'STARTED', label: 'Iniciado' },
    { id: 'ON_HOLD', label: 'Pausado' },
    { id: 'COMPLETED', label: 'Concluído' },
    { id: 'IN_TRANSCRIPTION', label: 'Em Transcrição' },
    { id: 'SIGNED', label: 'Laudado' },
    { id: 'CANCELED', label: 'Cancelado', time: '0min' }
];
