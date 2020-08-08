import React, { Component } from 'react';



class EventList extends Component {
 constructor(props){
     super(props);
 }
 render() {
    console.log(this.props.events)
    const p = this.props.events.map(event =>{
        console.log(event)
        return(
            <React.Fragment>
                <li>
                    <div className="event-time">{event.start} &nbsp;| {event.end}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-desc">{event.desc}</div>
                </li>
                <li>
                    <div className="event-time">{event.start} &nbsp;| {event.end}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-desc">{event.desc}</div>
                </li>
                <li>
                    <div className="event-time">{event.start} &nbsp;| {event.end}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-desc">{event.desc}</div>
                </li>
                <li>
                    <div className="event-time">{event.start} &nbsp;| {event.end}</div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-desc">{event.desc}</div>
                </li>

            </React.Fragment>
        )    
    })

    return(
           <div className="events">
               <ul>
                    {p}
               </ul>
            </div>
    )
   }
}

export default EventList;