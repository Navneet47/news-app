import React, { useEffect, useState } from 'react'
import NewsItem from "./NewsItem"
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import "../Styles/News.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import NotFound from "./NotFound";

const News = (props) => {
  const [state, setState] = useState({
    articles: [],
    loading: true,
    totalResult: 0,
  })
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState({
    text: '',
    headline: ''
  })

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  const updateNews = async () => {
    try {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
      let data = await fetch(url)
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(60);
      setState({ ...state, articles: parsedData.articles, totalResult: parsedData.totalResults, loading: false });
      props.setProgress(100);

    } catch (error) {
      setState({ ...state, articles: [`Error : ${error.msg}`] })
    }
  }

  useEffect(() => {
    // document.title = `${capitalizeFirstLetter(props.category)} - Headlines`
    updateNews();
    // eslint-disable-next-line
  }, [])


  const handleChange = (e) => {
    const { value } = e.target;
    setSearch({
      text: value
    });
  }

  const handleSearch = async (e) => {
    setSearch({ ...search, headline: search.text })
    e.preventDefault();
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?q=${search.text}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${40}`;
    let data = await fetch(url)
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setState({ ...state, articles: parsedData.articles, totalResult: parsedData.totalResults, loading: false });
    props.setProgress(100);
  }


  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
    setState({ ...state, loading: true })
    let data = await fetch(url)
    let parsedData = await data.json();
    setState({ ...state, articles: state.articles.concat(parsedData.articles), totalResult: parsedData.totalResults, });
  }

  return (
    <>
      <h1 className='text-center h1'>Top {search.headline ? search.headline : capitalizeFirstLetter(props.category)} Headlines</h1>
      <div className='container searchInput'>
        <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} id='text' value={search.text} name='text' />
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-outline-danger btn-lg my-2 mx-auto " type="submit" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {state.loading && <Spinner />}
      <InfiniteScroll
        dataLength={state.articles.length ? state.articles.length : 0}
        next={fetchMoreData}
        hasMore={state.articles.length !== state.totalResult}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {state.articles.length >= 1 ? state.articles.map((element, index) => {
              return <div key={`${element.url}${index}`} className="col-md-4">
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : "Description not provided"} imageUrl={element.urlToImage ? element.urlToImage : ''} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            }) : <NotFound dis={search.text === "" ? "none" : ''} text={search.headline === "" ? '' : search.headline} />}
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