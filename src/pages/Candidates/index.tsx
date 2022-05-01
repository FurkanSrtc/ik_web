import React, { useEffect } from 'react'
import HumanResourcesAPI from '../../api/humanResourcesAPI'
import { UserObject } from '../../types/userTypes'
import CustomTable from '../../components/customTable';
import { IoReaderOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function Candidates() {
  const [candidates, setCandidates] = React.useState<UserObject[]>([])
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  const selectedCandidate = (candidateId: string) => {
    navigate(`/candidates/${candidateId}`)
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = () => {
    setLoading(true)
    HumanResourcesAPI.GetUsers()
      .then(res => {
        setCandidates(res)
        console.log(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        // Cell: ({ value }:Cell) => { return {value} },
        sortType: "string",

      },
      {
        Header: "Phone",
        accessor: "phone",
        sortType: "string",
      },
      {
        Header: "Settings",
        Cell: (data: any) => {
          return (
            <button className='btn btn-primary' style={{paddingTop:5, paddingBottom:5, paddingInline:24}} onClick={() => { selectedCandidate(data.row.original.id) }}>
              <IoReaderOutline size={24} style={{padding:0, margin:0}} />
            </button>
          );
        }
      },
    ],
    []
  );

  return (
    <>
      <div className="candidates-section">
        <h1 style={{color:'#474E5D'}}>Candidates</h1>
      </div>  
      <div style={{ display: "flex", paddingLeft: 20, paddingRight: 20 }}>
        {loading ? <div>Loading...</div> :
        <CustomTable columns={columns} tableData={candidates ?? []} sortBy="name" />
        }
      </div>
    </>
  )
}
