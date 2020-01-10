import React from 'react';
import fetch from "node-fetch";

import Search from './search'
import Card from './card'
import './layout.css';

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
      queryId: "",
      errorMessage: "",
      singleValue: false,
      runSingleOutput: false,
      queryParamType: '',
      queryString: '',
      appliedQuery: '',
    }
    this.cleanDate = this.cleanDate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputID = this.inputID.bind(this);
    this.handleQueryParamChange = this.handleQueryParamChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleQueryParamChange(e) {
    this.setState({
      queryParamType: e.target.value
    });
  }
  
  handleInputChange(e) {
    this.setState({
      queryString: e.target.value
    });
  }

  inputID () {
    this.setState({
      appliedQuery: this.state.queryString
    });
    
    if (this.state.appliedQuery === "" || this.state.queryParamType === "") {
      return (
        alert("Please select a criterion and enter a value")
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

  filter(index, el) {

    if (
      this.state.queryParamType === 'body' && 
      this.state.body[index].includes(this.state.appliedQuery)
      ) {
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
    } 

    if (
      this.state.queryParamType === 'id' && 
      this.state.id[index] === this.state.appliedQuery
    ) {
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
    }

    if (
      this.state.queryParamType === 'author' &&
      this.state.author[index].includes(this.state.appliedQuery)
    ) {
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
    }

    if (
      this.state.queryParamType === 'rating' &&
      this.state.appliedQuery == el
    ) {
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
    }

    if (this.state.queryParamType === '' || this.state.appliedQuery === '') {
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
    }

    return null;
  }
  
  render () {
    return (
      <div data-testid="parentDiv">
        <div className="flex-center red-text">
          {this.state.errorMessage}
        </div>
        <Search 
          absInputChange={this.handleInputChange} 
          value={this.state.queryString}
          absQueryParamChange={this.handleQueryParamChange}
          queryParamType={this.state.queryParamType}
        />
      <div className="flex-center">
        <button 
          onClick={this.inputID}
          className="bg-light resetButton searchCriterion"
          type="submit"
        >Search
        </button>
      </div>
      <div className="top-padding flex-center">
      <button 
        className="bg-light resetButton searchCriterion"
        onClick={() => this.setState({
          queryParamType: ",",
          appliedQuery: "",
          queryString: ""
        })}
      > 
        Reset 
      </button>
      </div>

      <ul className='grid space-around'>
        {this.state.rating.map((el, index) => this.filter(index, el))}
      </ul>
    </div>
    )
  }
}

export default Reviews;