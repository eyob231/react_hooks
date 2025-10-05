'use client'

import { useState, useEffect } from 'react';

export default function Pagination() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const newData = await res.json();
            setData(newData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Removed currentPage from dependencies to prevent infinite loop

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pagination-container">
            <h1>Todo Items ({data.length} total)</h1>
            
            <div className="items-list">
                {currentItems.map((item: any) => (
                    <div key={item.id} className="item-card">
                        <h3 className="item-title">
                            {item.id}. {item.title}
                        </h3>
                        <div className={`item-status ${item.completed ? 'completed' : 'pending'}`}>
                            {item.completed ? '✅ Completed' : '⏳ Pending'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                >
                    ← Previous
                </button>
                
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="pagination-btn"
                >
                    Next →
                </button>
            </div>

            <style jsx>{`
                .pagination-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }

                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 30px;
                }

                .items-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .item-card {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .item-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }

                .item-title {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 16px;
                    line-height: 1.4;
                }

                .item-status {
                    font-size: 14px;
                    font-weight: bold;
                    padding: 4px 8px;
                    border-radius: 4px;
                    display: inline-block;
                }

                .item-status.completed {
                    background-color: #d4edda;
                    color: #155724;
                }

                .item-status.pending {
                    background-color: #fff3cd;
                    color: #856404;
                }

                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    margin-top: 30px;
                }

                .pagination-btn {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.2s;
                }

                .pagination-btn:hover:not(:disabled) {
                    background-color: #0056b3;
                }

                .pagination-btn:disabled {
                    background-color: #6c757d;
                    cursor: not-allowed;
                    opacity: 0.6;
                }

                .page-info {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    min-width: 120px;
                    text-align: center;
                }

                /* Loading state */
                .loading {
                    text-align: center;
                    color: #666;
                    font-size: 18px;
                }

                /* Responsive design */
                @media (max-width: 600px) {
                    .pagination-container {
                        padding: 10px;
                    }

                    .pagination-controls {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .item-card {
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
}