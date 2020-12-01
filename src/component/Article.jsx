import React from 'react'
import format from '../util/format'

const Article = (article) => {
    const image = article.multimedia?.find(item => item.format === 'Normal');

    return (
      <>
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">{article.title}</strong>
            
            <div className="mb-1 text-muted">
              {format(new Date(article.published_date), 'yyyy-MM-dd hh:mm:ss')}
            </div>
            <p className="card-text mb-auto">{article.abstract}</p>
            {image && <img
                src={image.url}
                width={image.width}
                height={image.height}
                alt={article.caption}
                className="mb-2"
              />
            }

            <a href={article.url}  className="stretched-link">
              View Full Content
            </a>
          </div>
        </div>
    </>
  )
}

export default Article