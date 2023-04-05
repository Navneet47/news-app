import React,{useEffect,useState} from 'react'
import NewsItem from "./NewsItem"
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import "../Styles/News.css";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {

  const [state,setState] = useState({
    articles: [],
    loading: true,
    totalResult:0
  })
  const [page,setPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c02d32e049e648a88ba02d87b95c3cc6&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url)
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setState({...state, articles: parsedData.articles, totalResult: parsedData.totalResults, loading: false});
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - Headlines`
    updateNews()
  },[])


  const fetchMoreData = async ()=>{
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setState({...state, loading: true })
    let data = await fetch(url)
    let parsedData = await data.json();
    setState({...state, articles: state.articles.concat(parsedData.articles), totalResult: parsedData.totalResults,});
  }

    return (
      <>
        <h1 className='text-center h1'>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={state.articles.length}
          next={fetchMoreData}
          hasMore={state.articles.length !== state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {state.articles.map((element) => {
              return <div key={element.url} className="col-md-4">
                <NewsItem title={element.title ? element.title:""} description={element.description ? element.description : "Description not provided"} imageUrl={element.urlToImage ? element.urlToImage : ''} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general',
  query: ''
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News