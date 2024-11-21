'use client'

import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import json from "./service.json";

export default function SurveyComponent({ id }: { id: string }) {
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        const data = sender.data
        data.senderId = id
        data.sentAt = new Date()
        console.log('id', id)
        console.log(JSON.stringify(data, null, 3));
    });

    return (
        <Survey model={survey} />
    );
}
