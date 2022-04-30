import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Navbar'
import AboutUs from '../../pages/AboutUs'
import Candidates from '../../pages/Candidates'
import Home from '../../pages/Home'
import CandidateDetails from '../../pages/Candidates/candidateDetails'

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="candidates" element={<Candidates />} />
      <Route path="candidates/:candidateId" element={<CandidateDetails />} />
      <Route path="about-us" element={<AboutUs />} />
    </Routes>
  )
}
