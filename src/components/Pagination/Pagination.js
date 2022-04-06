import React from "react";
import './Pagination.css'

const Pagination = ( { moviesPerPage, data, paginate } ) => {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(data / moviesPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div>
            <ul className="pagination">
                {
                    pageNumber.map(number => (
                        <li className='page-item' key={number} onClick={() => paginate(number)}>
                            <a href='#' className='page-link'>{number}</a>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}
export default Pagination