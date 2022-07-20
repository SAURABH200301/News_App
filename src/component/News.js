import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        // console.log("hey");
        this.state = {
            article: [],
            loading: false
        }
    }

    async componentDidMount(){
        console.log("cdm")
        let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=a7df729a314842e785fdac6dde42ffb8";
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({article: parsedData.articles})
    }

    handlePrevClick=()=>{

    }
    handleNextClick=()=>{

    }
    render() {
        return (
            <div className='container my-3'>
                
                <h2>NewsMonkey-Top Headlines</h2>
                <div className="row">
                {
                    
                    this.state.article.map((element) => {
                        return (
                            
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        
                                        title={element.title?element.title.slice(0,45):""}
                                        imageUrl= {element.urlToImage?element.urlToImage:"https://static.toiimg.com/photo/msid-92982272.cms"}
                                        description= {element.description?element.description.slice(0,88):""}
                                        newsUrl={element.url}
                                    />
                                </div>
                           
                         )
                    })
                    
                }
                </div>
                <div className='container d-flex justify-content-between'>
                {/* {console.log(this)} */}
                    <button disabled={this.state.page<=1} type="button" className='btn btn-primary' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button className='btn btn-primary' onClick={this.handleNextClick}>Next &rarr; </button>
                </div>          
            </div>
        )
    }
}
