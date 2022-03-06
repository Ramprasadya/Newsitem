import React, { Component } from 'react'
import Newsitem from './Newsitem'
// import Spinner from './Spinner';


export class News extends Component {
 
  constructor(){

    super();
    
     this.state = {
      articles: [],
      loading: false,
      page:1,
    }
  }
 async componentDidMount(){
   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=9ee5c1d9d7eb48769eafedea5c628b03&pageSize=${this.props.pageSize}`;
   
   let data = await fetch(url)
   this.setState({loading:true})
   let parsedData =await data.json()
   console.log(parsedData)
   this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
 }
   handlePreClick=async()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=&apiKey=9ee5c1d9d7eb48769eafedea5c628b03&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    this.setState({loading:true})
    let parsedData =await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page -1,
      articles:parsedData.articles,
      loading:false
    })
   }
   handleNextClick=async()=>{
     if(!(this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize))){

    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=&apiKey=9ee5c1d9d7eb48769eafedea5c628b03&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
   let data = await fetch(url)
   this.setState({loading :true});
   let parsedData =await data.json()
   console.log(parsedData)
   this.setState({
     page:this.state.page +1,
     articles: parsedData.articles,
     loading:false
   })
  }
   }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">Newsmonkey -Top headline</h1>
        {/* {this.state.loading &&<Spinner/>} */}
      <div className="row">
      {!this.state.loading && this.state.articles.map((element)=>{
       return <div className="col-md-4" key={element.url}>
            <Newsitem title ={element.title?element.title:""} description ={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
  })}
    
 
     </div>
     <div className="container d-flex justify-content-between">
     <button disabled={this.state.page<1} type="button" className="btn btn-dark"onClick={this.handlePreClick}>&larr;Previous</button>
     <button disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next&rarr;</button>
     </div>
      </div>
    )
  }
}

export default News