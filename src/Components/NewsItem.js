import React from 'react'

const NewsItem = (props)=> {

   const {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:0}}>
          <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="News-img" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description.length > 88 ? description.slice(0,88)+"...":description}</p>
              <p className='card-text'><small className='text-muted'>By {author ? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="blank" className="btn btn-sm btn-outline-danger">Read More</a>
            </div>
        </div>
      </div>
    )
  }

export default NewsItem