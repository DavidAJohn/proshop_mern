import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const Paginate = ({ pages, page, count, pageSize, keyword = '' }) => {
    const location = useLocation();
    const path = location.pathname;
    const baseURL = path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

    return pages > 1 && (
        <div style={{display: "flex", justifyContent: "flex-start"}} >
            <span>
                <Pagination>
                    {[...Array(pages).keys()]
                        .map(x => (
                            <LinkContainer key={x} to={`${baseURL}/page/${x+1}`}>
                                <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                            </LinkContainer>
                        ))
                    }
                </Pagination>
            </span>
            <span style={{padding: ".5rem 1.25rem"}}>
                Showing <span className='font-weight-bold'>{page > 1 ? (page * pageSize) - (pageSize - 1) : page}
                {' '}- {(pageSize * page) <= count ? (pageSize * page) : count} </span>
                of <span className='font-weight-bold'>{count}</span>
            </span>
        </div>
    )
}

export default Paginate;
