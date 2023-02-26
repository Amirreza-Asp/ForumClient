import React from 'react'
import NeonButton from '../../../app/common/buttons/NeonButton';
import MyTextInput from "./../../../app/common/inputs/MyTextInput";
import RegisterSteps from "./RegisterSteps";

interface Props{
  visible : boolean,
  goToNextStep : () => void,
}

export default function RegisterStep1({visible , goToNextStep } : Props) {
  return (
    <div className={`step-1 ${visible ? "active" : ""}`}>
      <MyTextInput name='name' placeholder='Name' icon='fa-thin fa-address-book'  />
      <MyTextInput name='family' placeholder='Family' icon='fa-thin fa-address-card'  />
      <div style={{display:"flex",justifyContent:"end",width:"100%"}}>
          <NeonButton type='button' shadow={false} value='next' onClick={goToNextStep} />
      </div>
    </div>
  )
}
