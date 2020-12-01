import React, {useEffect, useRef} from 'react'
import { Pagination, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom"
import getPageInfo from '../util/pagination'
import format from '../util/format'
import {search} from '../actions/newsActions'
import Spinner from './Spinner'
import useQuery from '../hooks/useQuery'
import './Search.css'

export default function Search() {
    const searchParams = useQuery();
    const query = searchParams.get('q')
    const dispatch = useDispatch()
    const searchState = useSelector((state) => {if (state.search.query=== query) { return state.search}})

    if (!searchState || !searchState.result)  return null

    const {result, currentPage, meta} = searchState 

    const {loading, error, list} =  result?.[currentPage] || {}

    if (error) {
        return (<Alert variant='warning' className='center-vertical'>{error.message}</Alert>)
    }

    if (loading) return <Spinner />

    const onSearchPage = (page) => {
        dispatch(search('test', page, searchState))
    }
    
    const getPagination = (pageInfo) => {
        const {hasPrev, hasNext, totalPage} = pageInfo
        return (
            <Pagination className='search-pagination' >
                <Pagination.First onClick={()=>onSearchPage(1)}/>
                {hasPrev && <Pagination.Prev onClick={()=>onSearchPage(currentPage - 1)}/>}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {hasNext && <Pagination.Next  onClick={()=>onSearchPage(currentPage + 1)}/>}
                <Pagination.Last onClick={()=>onSearchPage(totalPage)}/>
            </Pagination>
        )
    }

    const pageInfo = getPageInfo(currentPage, meta.hits)

    return (
        <div  className="container">
            {getPagination(pageInfo)}
            {list && list.map(item => {
                const image = item.multimedia?.find(
                    item => item.type === 'image' && item.subtype === 'master180'
                )
                return (
                    <div
                        key={item._id}
                        className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
                    >
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">{item.headline?.main}</strong>
                            <div className="mb-1 text-muted">
                                {format(new Date(item.pub_date), 'yyyy-MM-dd hh:mm:ss')}
                            </div>
                            <p className="card-text mb-auto">{item.abstract}</p>
                            {image && <img src={image.url} width={image.width} height={image.height} alt={image.caption || ''}/>}
                            <Link target={"_blank"} to={item.web_url}>View Full Content</Link>
                        </div>
                    </div>
                )
            })
        }
    </div>)
}
