import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import propTypes from 'prop-types';
import 'animate.css'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    // eslint-disable-next-line react/no-typos
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }

    constructor(props) {
        super(props);
        // console.log("hey");
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey: ${this.props.category[0].toUpperCase() + this.props.category.slice(1)}`
    }
    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7df729a314842e785fdac6dde42ffb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData)
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        // console.log("cdm")
        this.updateNews();
    }

    // handlePrevClick = async () => {
    //     // console.log("prev")
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }
    // handleNextClick = async () => {
    //     // console.log("next")
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
     fetchMoreData = async  () => {
        this.setState({page: this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7df729a314842e785fdac6dde42ffb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData)
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };
    render() {
        return (
            <>
                <h2 className='  text-center bg-dark text-white p-2 rounded'>{this.props.category ? this.props.category[0].toUpperCase() + this.props.category.slice(1) : 'NewsMonkey'}-Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container my-3'>
                <div className="row">
                    {

                        this.state.article.map((element) => {
                            return (

                                <div className="col-md-4 " key={element.url} >
                                    <NewsItem

                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://static.toiimg.com/photo/msid-92982272.cms"}
                                        description={element.description ? element.description.slice(0, 88) : ""}
                                        newsUrl={element.url}
                                        publishedAt={element.publishedAt}
                                        author={element.author}
                                        sourceName={element.source.name}
                                    />
                                </div>

                            )
                        })

                    }
                </div>
                </div>
                </InfiniteScroll>
                    {/* {console.log(this)} */}
                    {/* <button disabled={this.state.page <= 1} type="button" className='btn btn-primary' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-primary' onClick={this.handleNextClick}>Next &rarr; </button> */}
            </>
        )
    }
}
