import React, { useState, useEffect } from 'react';

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

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(meta.currentPage - 1)}
                disabled={meta.currentPage === 1}
            >
                Prev
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={meta.currentPage === page ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(meta.currentPage + 1)}
                disabled={meta.currentPage === meta.lastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;