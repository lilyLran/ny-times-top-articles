import React from 'react'
import {useParams} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {getCategorizedNews} from '../actions/newsActions'
import {Spinner} from 'react-bootstrap';
import Article from '../component/Article'

const CategorizedNews = () => {
    let {category} = useParams();
    const dispatch = useDispatch()
    category = category || 'home'
    const section = useSelector(state => state?.stories?.[category.toLowerCase()])
    if (!section) {
        dispatch(getCategorizedNews(category))
        return null
    }
    
    const {loading, error, results} = section
    console.log('loading, error, results, category', loading, error, results, category)
    if (error) return (<div className='center-vertical'>{error.message}</div>)
    if (loading) return (
        <div className='center-vertical'>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    ) 
    if (!results) return (<div className='center-vertical'>empty list</div>)
    
    const child = results.map((item) => {
        return <Article key={item.uri} {...item }/>
    })

    return (
        <div className='container'>
            {child}
        </div>
    )
}
export default CategorizedNews
