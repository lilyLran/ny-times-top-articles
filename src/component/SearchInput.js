import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom"
import {search} from '../actions/newsActions'
import {FormControl, InputGroup, Button, OverlayTrigger, Popover, Row} from 'react-bootstrap';
import  './SearchInput.css'

export default function SearchInput() {
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const recentSearches = useSelector((state) => state.search.recentSearches) || []

    const onKeyDown = (e) => {
        const enter = 13
        if(e.keyCode === enter) {
            onSearch()
        }
    }
    const onSearch = (text) => {
        const searchText = text || query
        if (!searchText) return;
        dispatch(search(searchText, 1))
        history.push(`/search?q=${encodeURIComponent(query)}`)
    }

    const selectRecentSearch = (query) => {
        setQuery(query)
        onSearch(query)
    }

    const onFocus = () => {
        if (recentSearches.length > 0) {
            setShow(true)
        }
    }
    const searches = recentSearches.map(item => <Button 
            className="col-4 recent-search-button"
            onClick={() => selectRecentSearch(item)}
            key={item}>
            {item}
        </Button>
    )

    return (
        <OverlayTrigger
            key='bottom'
            placement='bottom-start'
            show={show}
            overlay={
                <Popover id={`popover-positioned-bottom`} className="recent-search-content">
                <Popover.Title as="h3">Recent Searches</Popover.Title>
                <Popover.Content >
                    <Row>
                        {searches}
                    </Row>
                </Popover.Content>
                </Popover>
            }
        >
            <InputGroup>
                <FormControl
                    placeholder="Please enter search text"
                    aria-label="search input"
                    onKeyDown={onKeyDown}
                    value={query}
                    onFocus={onFocus}
                    onBlur={()=> setShow(false)}
                    onChange={e => setQuery(e.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={() => onSearch()}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
      </OverlayTrigger>
    );

}
