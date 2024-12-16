import { headers } from "next/headers";
import api from "./api";

export enum ExamTypeEnum {
    HI_LIGHT = 'HI-LIGHT',
    HI_AEROS = 'HI-AEROS',
    HI_DEEP = 'HI-DEEP',
    HI_FOCUS = 'HI-FOCUS',
}

export interface CreateAppointmentBody {
    // Propriedades do CreateServiceRequestDto
    cpf: string;
    date: string;
    hour: number;
    minute: number;
    examType: ExamTypeEnum;

    // Propriedades do CreateClientDto
    name: string;
    gender: 'male' | 'female' | 'other';
    email: string;
    phone: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    birthdate: string;
}

export async function createAppointment(data: CreateAppointmentBody) {
    const response = await api.post('service-requests', data, {
        headers: {
            'api-key': 'AcN55Gg1Hfe30LMtZ2'
        }
    })
    return response
}