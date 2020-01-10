import React from 'react';
import fetch from "node-fetch";

import Card from './card'
import './layout.css';

function getDifference(oldval, newval)
{
    let j = 0;
    let result = "";

    while (j < newval.length)
    {
        if (typeof (oldval[j]) === "undefined"){
           if (oldval[j-result.length] !== newval[j]){
              result += newval[j];
           }  
        }else{
           if (oldval[j] !== newval[j]){
              result += newval[j];
           }  
        }
            
        j++;
    }
    return result;
}

let cache = {};

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
      queryId: "",
      errorMessage: "",
      singleValue: false,
      runSingleOutput: false,
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
      console.log(this.state.queryId)
      const target = e.target
      const value = target.value
      this.setState({
        queryId: value,
      })
    }
  }

  async inputID () {
    let stringId = String(this.state.queryId)

    if (this.state.id.indexOf(stringId) !== -1 && this.state.queryId !== "") {
      this.setState({ errorMessage: "", singleValue: true })
      await fetch(`https://shakespeare.podium.com/api/reviews/${this.state.queryId}`, {
      method: 'GET',
      headers: {
        "x-api-key": "H3TM28wjL8R4#HTnqk?c"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return (
          this.setState({
            rating: [data.rating],
            publish_time: [this.cleanDate(data.publish_date, "time")],
            publish_date: [this.cleanDate(data.publish_date, "date")],
            id: [data.id],
            body: [data.body],
            author: [data.author],
          })
        )
     })
    }
    else if (this.state.queryId === "") {
      return cache
    }
    else {
      return (
        this.setState({ errorMessage: "Please enter a valid ID number."})
      )
    }
  }

  async componentDidMount() {
    await fetch('https://shakespeare.podium.com/api/reviews', {
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
    cache = Object.assign({}, this.state)
    console.log(cache)
  }

  cleanDate(dateTime, differentiator) {
    let uncleanDate = dateTime.slice(0,10);
    let uncleanTime = dateTime.slice(11,19);

    let time = uncleanTime.split(':');

    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    let seconds = Number(time[2]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours === 0) {
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
    if (Object.values(cache).length <= 0 ||  this.state.singleValue === true) {
      return (
        <div data-testid="parentDiv">
          <div className="flex-center red-text">
            {this.state.errorMessage}
          </div>
          <div className="flex-center bottom-padding">
            <input
              type="text"
              placeholder="Please enter a valid ID number" 
              onChange={this.handleInputChange}
              />
            <button onPaste={this.paste} onClick={() => {this.inputID()}}>Search</button>
          </div>
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
    // when reverting back to original
    else {
      return (
        <div>
        <div className="flex-center red-text">
            {this.state.errorMessage}
          </div>
          <div className="flex-center bottom-padding">
            <input
              type="text"
              placeholder="Please enter a valid ID number" 
              onChange={this.handleInputChange}
              />
            <button onPaste={this.paste} onClick={() => {this.inputID()}}>Search</button>
          </div>
        <ul className='grid space-around'>
          {cache.rating.map((el, index) => {
            return (
              <li key={index}>
                <Card
                  rating={`Rating: ${el}`}
                  publish_time={cache.publish_time[index]}
                  publish_date={cache.publish_date[index]}
                  ID={`ID: ${cache.id[index]}`}
                  body={cache.body[index]}
                  author={`Author: ${cache.author[index]}`}
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
}

export default Reviews;