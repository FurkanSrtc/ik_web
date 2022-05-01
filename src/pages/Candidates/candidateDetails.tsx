import React from 'react';
import { useParams } from 'react-router-dom';
import HumanResourcesAPI from '../../api/humanResourcesAPI';
import { UserObject } from '../../types/userTypes';

export default function CandidateDetails() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = React.useState<UserObject>();
  React.useEffect(() => {
    HumanResourcesAPI.GetUser(candidateId ?? '')
      .then((response) => {
        setCandidate(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [candidateId]);
  return (
    <>
      <div className="candidates-section">
        <h1 style={{ color: '#474E5D' }}>Candidate Details</h1>
      </div>
      <article className="card">
        <div className="text">
          <h3>
            {`Full Name: ${candidate?.name}`}
          </h3>
          <h3>
            {`Phone:${candidate?.phone}`}
          </h3>
          <h3>
            {`Email:${candidate?.email}`}
          </h3>
          <h3>
            {`City:${candidate?.address.city}`}
          </h3>
          <h3>
            {`Adres:${candidate?.address.street}`}
          </h3>
          <h3>
            {`Website:${candidate?.website}`}
          </h3>
        </div>
      </article>

    </>
  );
}
