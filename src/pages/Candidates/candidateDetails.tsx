import React from 'react';
import { useParams } from 'react-router-dom';
import HumanResourcesAPI from '../../api/humanResourcesAPI';
import { UserObject } from '../../types/userTypes';
import { BiMap } from "react-icons/bi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

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
        <h1 className='second-color'>Candidate Details</h1>
      </div>
      <div className='user-card'>
        <div >
          <img style={{ borderRadius: "50%" }} width={200} src={require("../../assets/images/user.png")} alt="candidate" />
          <br/>
          <h2 style={{textAlign:"center"}}>{candidate?.name}</h2>
        
          <div className="user-card-details">

          <h3>
            {candidate?.email}
          </h3>
          <h3>
            {`City:${candidate?.address.city}`}
          </h3>

        </div>

          <div style={{position:"absolute", textAlign:"center", left:0, right:0,padding:5 }}>
          
          <a
            href={`https://maps.google.com/maps?q=${candidate?.address.geo.lat},${candidate?.address.geo.lng}&hl=es;z=14&amp;output=embed`}
            style={{ color: "#0000FF", padding: 5 }}
            target="_blank" rel="noreferrer"
          >
            <BiMap size={50} className="icon" />
          </a>
          <a
            href={`mailto:${candidate?.email}`}
            style={{ color: "#0000FF", padding: 5 }}
            target="_blank" rel="noreferrer"
          >
            <AiOutlineMail size={50} className="icon" />
          </a>
          <a
            href={`tel:${candidate?.phone}`}
            style={{ color: "#0000FF", padding: 5 }}
            target="_blank" rel="noreferrer"
          >
            <AiOutlinePhone size={50} className="icon" />
          </a>
          </div>
          </div>

        

      </div>
      <iframe title='map' src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.4091682232647!2d$${candidate?.address.geo.lat}!3d${candidate?.address.geo.lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa7c5ad2711135d1d!2zNDPCsDU3JzAzLjIiUyAzNMKwMjcnNDIuNSJX!5e0!3m2!1str!2str!4v1651411776867!5m2!1str!2str`} width="100%" height="450" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


    </>
  );
}
