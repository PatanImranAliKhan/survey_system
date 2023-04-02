import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <div className='container'>
            <Link className='' to="/create_survey">Create Survey</Link>
        </div>
    </div>
  )
}
