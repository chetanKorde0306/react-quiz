import React from 'react'
import {useState} from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Questions.css'
import { Button } from '@mui/material';
// import { Navigate } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
const Question = ({currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,}) => {
  const [selected,setSelected] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleSelect=(i)=>{
     if(selected===i && selected===correct){
       return "select"
     }else if(selected===i && selected!==correct){
       return "wrong"
     }else if(i=== correct){
      return "select"
     }
  }
  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };
  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };
  return (
   
    <div>
      <h1>Questions {currQues+1}</h1>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {
          options && 
          options.map(i=>(
            <button 
            onClick={(()=>handleCheck(i))}
            className={`singleOption ${selected && handleSelect(i)}`}
            key={i}
            disabled ={selected}
            >{i}</button>
          ))
        }

        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>  
      </div>
    </div>
  )
}

export default Question ; 