import React, { useState, useEffect } from 'react';
import "./Pagination.css"

interface Meta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: null | string;
    next: null | string;
}

interface PaginationProps {
    meta: Meta;
    onPageChange: (page: number) => void;
    visiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange, visiblePages = 10 }) => {
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        const current = meta.currentPage;
        const last = meta.lastPage;
        const half = Math.floor(visiblePages / 2);
        let start = current - half + 1 - visiblePages % 2;
        let end = current + half;

        // Adjusting the start and end if they are out of bounds
        if (start < 1) {
            start = 1;
            end = Math.min(visiblePages, last);
        }
        if (end > last) {
            start = Math.max(last - visiblePages + 1, 1);
            end = last;
        }

        const newPages = [];
        for (let i = start; i <= end; i++) {
            newPages.push(i);
        }
        setPages(newPages);
    }, [meta.currentPage, meta.lastPage, visiblePages]);

    return pages.length > 0 && (
        <div className="pagination">
            <button
                onClick={() => onPageChange(meta.currentPage - 1)}
                disabled={meta.currentPage === 1}
                className='pagination__button'
            >
                <svg fill="#000000" viewBox="-12 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.8 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.44 0.24-0.64 0.24z"></path></g></svg>
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={meta.currentPage === page ? 'pagination__page active' : 'pagination__page'}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(meta.currentPage + 1)}
                disabled={meta.currentPage === meta.lastPage}
                className='pagination__button'
            >
                <svg fill="#000000" viewBox="-12 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M0.88 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.76-5.84-5.8-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.4 6.44c-0.2 0.16-0.4 0.24-0.6 0.24z"></path> </g></svg>
            </button>
        </div>
    );
};

export default Pagination;