import React, { useEffect, useState } from 'react';

const Bookmarks = () => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const totalPages = Math.ceil(bookmarkedArticles.length / pageSize);
    const startPage = Math.floor((page - 1) / 3) * 3 + 1;
    const endPage = Math.min(startPage + 2, totalPages);
    const currentArticles = bookmarkedArticles.slice((page - 1) * pageSize, page * pageSize);

    const dummyImages = [
        "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE=",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];
        console.log('Retrieved bookmarked articles:', storedArticles);
        setBookmarkedArticles(storedArticles);
    }, []);

    const removeBookmark = (index) => {
        const updatedArticles = [...bookmarkedArticles];
        updatedArticles.splice(index, 1);
        setBookmarkedArticles(updatedArticles);
        localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedArticles));
    };

    const removeAllBookmarks = () => {
        setBookmarkedArticles([]);
        localStorage.removeItem('bookmarkedArticles');
    };

    const handlePreviousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < Math.ceil(bookmarkedArticles.length / pageSize)) {
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNum) => {
        setPage(pageNum);
    };

    return (
        <div className="container my-5">
            {bookmarkedArticles.length === 0 ? (
                <p className="text-center display-6">No bookmarked articles found.</p>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className=""></div>
                        <div className=""></div>
                        <h1 className='text-center' style={{ color: "rgb(0, 166, 255)" }}>
                            {`Bookmarked Articles - Page ${page}`}
                        </h1>
                        <div className="text-center"> <button className="btn btn-remove" onClick={removeAllBookmarks} > Remove All Bookmarks </button> </div>
                    </div>

                    <div className="row">
                        {currentArticles.map((article, index) => {
                            const dummyImage = !article.image ? dummyImages[Math.floor(Math.random() * dummyImages.length)] : article.image;

                            return (
                                <div className="col-md-4" key={index}>
                                    <div className="card" style={{ width: "21rem", height: "36rem", boxShadow: "2px 2px 15px #737575 inset, 3px 4px 9px #101010" }}>
                                        <img src={dummyImage} className="card-img-top overflow-hidden" alt="..." />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: "rgb(0, 166, 255)" }}>
                                            {article.source}
                                        </span>
                                        <div className="card-body" style={{ maxHeight: "17rem", overflow: "hidden" }}>
                                            <h5 className="card-title">{article.title}</h5>
                                            <p className="card-text">{article.description}</p>
                                            <a href={article.newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-read_more">Read more</a>
                                            <p className="card-text"><small className="text-muted">Last updated on {new Date(article.date).toGMTString()}</small></p>
                                        </div>
                                        <div className="card-footer"> <button className="btn btn-remove" onClick={() => removeBookmark(index)} > Remove Bookmark </button> </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="container d-flex justify-content-around my-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                            <li className="page-item"> <button disabled={page <= 1} type="button" className="btn" onClick={handlePreviousClick} style={{ backgroundColor: "rgb(0, 166, 255)", color: "white" }}> &laquo; Previous </button> </li>
                                {[...Array(endPage - startPage + 1)].map((_, index) => (
                                    <li key={index} className={`page-item ${page === startPage + index ? 'active' : ''}`} >
                                        <button type="button" className="btn btn-link pagination-buttons" onClick={() => handlePageClick(startPage + index)}>{startPage + index}</button>
                                    </li>
                                ))}
                              <li className="page-item"> <button disabled={page >= totalPages} type="button" className="btn" onClick={handleNextClick} style={{ backgroundColor: "rgb(0, 166, 255)", color: "white" }}> Next &raquo; </button> </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
};

export default Bookmarks;
