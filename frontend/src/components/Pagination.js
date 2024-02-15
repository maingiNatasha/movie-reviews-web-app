import React from 'react';

import Button from 'react-bootstrap/Button';

const Pagination = ({ currentPage, setCurrentPage, entriesPerPage }) => {
    return (
        <div>
            Showing page: {currentPage + 1}.
            <Button variant='link' onClick={() => setCurrentPage(currentPage + 1)}>Get next {entriesPerPage} results</Button>
        </div>
    )
}

export default Pagination