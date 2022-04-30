import React from 'react'
import { useParams } from 'react-router-dom';

export default function CandidateDetails() {
let { candidateId } = useParams();

  return (
    <div>CandidateDetails {candidateId}</div>
  )
}
