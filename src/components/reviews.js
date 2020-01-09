import React from 'react';
import fetch from "node-fetch";

import Card from './card'
import './layout.css';

function getDifference(oldval, newval)
{
    let i = 0;
    let j = 0;
    let result = "";

    while (j < newval.length)
    {
        if (typeof (oldval[j]) === "undefined"){
           if (oldval[j-result.length] != newval[j]){
              result += newval[j];
           }  
        }else{
           if (oldval[j] != newval[j]){
              result += newval[j];
           }  
        }
            
        j++;
    }
    return result;
}

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: [],
      publish_time: [],
      publish_date: [],
      id: [],
      body: [],
      author: [],
      pasting: false,
      id: ""
    }
    this.cleanDate = this.cleanDate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.paste = this.paste.bind(this);
  }

  paste(e) {
    this.setState({ pasting: true, id: e.target.value})
  }
  
  handleInputChange(e) {
    if(this.state.pasting){
      let oldval = this.state.id;
      let newval = e.target.value;
      let pastedValue = getDifference(oldval, newval);
      console.log(pastedValue);
      this.setState({pasting: false});
    }
    else {
      const target = e.target
      const value = target.value
      this.setState({
        id: value,
      })
    }
  }

  inputID () {
     fetch(`https://shakespeare.podium.com/api/reviews/${this.state.id}`, {
     method: 'GET',
     headers: {
       "x-api-key": "H3TM28wjL8R4#HTnqk?c"
     }
   })
     .then((response) => {
       return response.json();
     })
     .then((data) => {
      data.forEach(el => {
        this.setState({
          rating: [...this.state.rating, el.rating],
          publish_time: [...this.state.publish_time, this.cleanDate(el.publish_date, "time")],
          publish_date: [...this.state.publish_date, this.cleanDate(el.publish_date, "date")],
          id: [...this.state.id, el.id],
          body: [...this.state.body, el.body],
          author: [...this.state.author, el.author],
        })
      })
    })
    console.log(this.state.id)
  }

  componentDidMount() {
    fetch('https://shakespeare.podium.com/api/reviews', {
    method: 'GET',
    headers: {
      "x-api-key": "H3TM28wjL8R4#HTnqk?c"
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach(el => {
        this.setState({
          rating: [...this.state.rating, el.rating],
          publish_time: [...this.state.publish_time, this.cleanDate(el.publish_date, "time")],
          publish_date: [...this.state.publish_date, this.cleanDate(el.publish_date, "date")],
          id: [...this.state.id, el.id],
          body: [...this.state.body, el.body],
          author: [...this.state.author, el.author],
        })
      })
    })
  }

  cleanDate(dateTime, differentiator) {
    let uncleanDate = dateTime.slice(0,10);
    let uncleanTime = dateTime.slice(11,19);

    let time = uncleanTime.split(':'); // convert to array

    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let seconds = Number(time[2]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    timeValue += (hours >= 12) ? " P.M." : " A.M.";

    let monthDayYear = uncleanDate.split("-")

    let returnValue = differentiator === "date" 
      ? `${monthDayYear[1]}/${monthDayYear[2]}/${monthDayYear[0]}`
      : `${timeValue}`

    return returnValue
  }
  
  render () {
    return (
      <div>
        <input 
          type="text" 
          onChange={this.handleInputChange}
          />
        <button onPaste={this.paste} onClick={() => {this.inputID()}}>Submit</button>
      <ul className='grid space-around'>
        {this.state.rating.map((el, index) => {
          return (
            <li key={index}>
              <Card
                rating={`Rating: ${el}`}
                publish_time={this.state.publish_time[index]}
                publish_date={this.state.publish_date[index]}
                ID={`ID: ${this.state.id[index]}`}
                body={this.state.body[index]}
                author={`Author: ${this.state.author[index]}`}
              >
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
    )
  }
}

export default Reviews;