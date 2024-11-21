'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const SurveyComponent = dynamic(() => import('../component'), { ssr: false });

export default function Page() {
    const params = useParams();
    const { token } = params

    return <SurveyComponent id={token as string} />;
}
