import React, { useEffect, useState } from 'react';
import NewsItems from "./Newsitems";
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // New state for total results
  const totalPages = Math.ceil(totalResults / props.pageSize); 
  const startPage = Math.floor((page - 1) / 3) * 3 + 1; 
  const endPage = Math.min(startPage + 2, totalPages);

  const capitalizeLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async (page) => {
    props.setprogress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      props.setprogress(40);
      let parsedData = await data.json();
      props.setprogress(60);
      setArticles(parsedData.articles || []); // Ensure articles is an array
      setTotalResults(parsedData.totalResults || 0); // Ensure totalResults is a number
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the news articles: ", error);
      setArticles([]); // Set articles to an empty array on error
      setLoading(false);
    }
    props.setprogress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeLetter(props.category)} - Top headlines`;
    updateNews(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, page]);

  const handlePreviousClick = async () => {
    setPage(page - 1);
    updateNews(page - 1);
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews(page + 1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
    updateNews(pageNum);
  };

  return (
    <>
      <div className="container my-5">
        <h1 className='text-center mb-5' style={{ color: "rgb(0, 166, 255)" }}>
        {`Daily News From ${capitalizeLetter(props.category)} Category - Page ${page}`}
        </h1>

        {loading && (
          <div className="spinner-border text-dark spinner-element" role="status" style={{ padding: "30px", margin: "9rem 40rem" }}></div>
        )}

        <div className="row">
          {!loading && articles.map((element, index) => (
            <div className="col-md-4 d-flex justify-content-center" key={element.url && index}>
              <NewsItems
                title={element.title ? element.title.slice(0, 77) + '...' : "Title is not available"}
                description={element.description ? element.description.slice(0, 55) + '...' : element.title}
                image={element.urlToImage}
                newsurl={element.url}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container d-flex justify-content-around my-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
          <li className="page-item"> <button disabled={page <= 1} type="button" className="btn" onClick={handlePreviousClick} style={{ backgroundColor: "rgb(0, 166, 255)", color: "white" }}> &laquo; Previous </button> </li>
            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <li key={index} className={`page-item ${page === startPage + index ? 'active' : ''}`} >
                <button type="button" className="btn btn-link pagination-buttons"  onClick={() => handlePageClick(startPage + index)} >{startPage + index}</button>
              </li>
            ))}
          <li className="page-item"> <button disabled={page >= totalPages} type="button" className="btn" onClick={handleNextClick} style={{ backgroundColor: "rgb(0, 166, 255)", color: "white" }}> Next &raquo; </button> </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default News;

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setprogress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};
