import React, { useState } from 'react';
import { useQuery } from 'react-query';
import './NewsFeed.css';  

const fetchNews = async (key, sort = 'LATEST') => {
    const res = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&sort=${sort}&apikey=${import.meta.env.VITE_NEWS_FEED_API_KEY}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  console.log(data);  
  return data;
};

const NewsFeed = () => {
  const [sort, setSort] = useState('LATEST');
  const { data, status } = useQuery(['newsData', sort], fetchNews);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  if (status === 'loading') {
    return 'Loading...';
  }
  if (status === 'error') {
    return 'An error occurred.';
  }
  if (data) {
    return (
      <div className="newsfeed-container">
        <h2 className="newsfeed-title">News Feed</h2>
        <div className="sort-container">
          <label>Sort by: </label>
          <select className="sort-dropdown" value={sort} onChange={handleSortChange}>
            <option value="LATEST">Latest</option>
            <option value="EARLIEST">Earliest</option>
            <option value="RELEVANCE">Relevance</option>
          </select>
        </div>
        {data.feed.map((article, index) => (
        <div key={index} className="article-card">
            <img className="article-banner" src={article.banner_image} alt="Article banner"/>
            <div className="article-details">
            <a className="article-link" href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
            </a>
            <p className="article-authors">By: {article.authors.join(', ')}</p>
            <p className="article-summary">{article.summary}</p>
            </div>
        </div>
        ))}

      </div>
    );
  } else {
    return 'No articles found.';
  }
};

export default NewsFeed;
