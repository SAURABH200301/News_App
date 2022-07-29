import React, { Component } from 'react'
import 'animate.css'

export default class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, publishedAt, author,sourceName } = this.props;
        // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // const d=new Date(publishedAt);
        // const date = d.getDate();
        // const month = d.getMonth();
        // const year = d.getFullYear();
        // const day = d.getDay();
        // const newDate =date+ '/'+months[month]+'/'+year+'   '+days[day]
        // console.log(Date.parse(d))

        return (
            <div className='my-3'>
                <div className="card" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex: '1'}}> {sourceName}</span>
                    <img src={imageUrl} className="card-img-top" style={{ height: "176px" }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'}</small></p>
                        <p className="card-text"><small className="text-muted"> On {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer" >Read More</a>
                        {/* <div style={{float: 'right'}}>{newDate}</div> */}

                    </div>
                </div>
            </div>
        )
    }
}
