import React, { useState } from 'react';
import { Button, Dropdown } from 'react-materialize';
import {Doughnut} from 'react-chartjs-2';

export default function Budget(props) {
  const [month, setMonth] = useState('August 2019');
  const [index, setIndex] = useState(7);
  const [budget, setBudget] = useState(props.budget);
  return (
    <div>
      <div style = {{position: 'absolute', left: '-50px', top: '235px'}}>
        <Dropdown trigger = {<Button style = {{position: 'relative', left: '110px', backgroundColor: '#022d64'}}>{month}</Button>}>
          {props.monthlyTotals.labels.map((month, index1) => 
          <a style = {{color: '#022d64'}} onClick = {(e) => {
            setMonth(month)
            setIndex(index1);
            }}>{month}</a>
          )}
        </Dropdown>
      </div>
      {props.monthlyTotals.data[index] < props.budget ? (
        <p style = {{fontSize: '20px', color: 'green'}} className = 'center'>You are currently under budget by ${props.monthlyTotals.data[index] - props.budget}</p>
      ) : (
        <p style={{fontSize: '20px', color: 'red'}} className = 'center'>You are currently over budget by ${props.monthlyTotals.data[index] - props.budget}</p>
      )}
      <div style = {{position: 'relative', height: '250px', width: '400px', paddingLeft: '30px'}} className = 'card'>
        <p className = 'center' >Current Budget: ${props.budget}</p>
        <p className = 'center' >Update Budget</p>
        <div className = 'center' style = {{width: '200px', paddingLeft: '30px'}}>
          <input value = {budget} onChange = {(e) => setBudget(e.target.value)} className = 'center' type="number" placeholder='budget' />
        </div>
        <div style = {{paddingTop: '40px'}} className = 'center'>
          <Button style = {{backgroundColor: '#022d64'}} onClick = {() => {props.submitBudget(budget)}}>Submit</Button>
        </div>
        <div style = {{position: 'absolute', left: '530px', top: '0px'}} className = 'card'>
          {props.monthlyTotals.data[index] < props.budget ? (<Doughnut 
            width = {350}
            height = {350}
            options = {{maintainAspectRatio: true}}
            data = {{
              datasets: [{
                data: [props.monthlyTotals.data[index], budget - props.monthlyTotals.data[index]],
                backgroundColor: [
                  'rgba(46, 204, 113, 1)',
                  'rgba(0,0,0,0)',
                ]
              }],
              labels: ['Expenses', 'Extra']
            }} />) : (
              <Doughnut 
                width = {350}
                height = {350}
                options = {{maintainAspectRatio: true}}
                data = {{
                  datasets: [{
                    data: [props.monthlyTotals.data[index]],
                    backgroundColor: [
                      'rgba(242, 38, 19, 1)'
                    ]
                  }],
                  labels: ['Expenses']
                }} />)}
        </div>
      </div>
    </div>
  )
}
