import React, { useState } from 'react';

const NewsItems = (props) => {
    const { title, description, image, newsurl, date, source } = props;
    const [isBookmarked, setIsBookmarked] = useState(false);
   
    const dummyImages = [
        "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE=",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const dummyImage = !image ? dummyImages[Math.floor(Math.random() * dummyImages.length)] : image;
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        const bookmarkedArticles = JSON.parse(localStorage.getItem('bookmarkedArticles')) || [];
        const articleIndex = bookmarkedArticles.findIndex(article => article.newsurl === newsurl);
        if (articleIndex === -1) {
            bookmarkedArticles.push({ title, description, image, newsurl, date, source });
        } else {
            bookmarkedArticles.splice(articleIndex, 1);
        }
        localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
    };

    return (
        <div className="card my-2" style={{ width: "21rem", height: "32rem", boxShadow: "2px 2px 15px #737575 inset, 3px 4px 9px #101010" }}>
            <img src={dummyImage} className="card-img-top overflow-hidden" alt="..." />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{ backgroundColor: "rgb(0, 166, 255)" }}>
                {source}
            </span>
            <div className="card-body" style={{ maxHeight: "17rem", overflow: "hidden" }}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-read_more" >Read more</a>
                <button onClick={toggleBookmark} className="btn btn-read_more" style={{ marginLeft: '5px' }}>
                    {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                </button>
                <p className="card-text"><small className="text-muted">Last updated on {new Date(date).toGMTString()}</small></p>
            </div>
        </div>
    );
};

export default NewsItems;
