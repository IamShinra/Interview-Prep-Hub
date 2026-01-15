import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ApptitudeQuesation() {
  const [quesation, setQuesation] = useState([]);
  useEffect(() => {
    axios.get('/data/apptitudequesations.json')
    .then((res) => {
      setQuesation(res.data);
      console.log(res.data);
    });
  }, [])
  return (
    <div>
        {quesation.map((quesation) => (
          <div>
            <h1>{quesation.quesation}</h1>
          </div>
        ))}
    </div>
  )
}

export default ApptitudeQuesation