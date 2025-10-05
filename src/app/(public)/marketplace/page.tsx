"use client";
import { useState, useEffect } from "react";
import styles from "./marketplace.module.css";

export default function Marketplace() {
    const [products, setProducts] = useState<any[]>([]);
    const [sort, setSort] = useState("default");
    const [order, setOrder] = useState("default");
    const [pageSize, setPageSize] = useState(15);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // const res = await fetch(
            //     `/marketplace/all`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         sort,
            //         page,
            //         pageSize ,
            //         order
            //     })}
            //     );
            //     if(!res.ok) throw new Error("Failed to load products");

            // const data = await res.json();
            // setProducts(data.items || []);
            // setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sort, limit, page]);

    return (
        <div className={styles.marketplace}>
            {/* Controls */}
            <div className={styles.controls}>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="default">Sort by Default</option>
                    <option value="price-asc">Price (Low → High)</option>
                    <option value="price-desc">Price (High → Low)</option>
                    <option value="newest">Newest</option>
                </select>

                <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                    <option value={15}>Display 15 Products per page</option>
                    <option value={30}>Display 30 Products per page</option>
                    <option value={50}>Display 50 Products per page</option>
                </select>
            </div>

            {/* Products */}
            <div className={styles.grid}>
                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.marketplaceItemId}
                            className={styles.card}
                        >
                            <img
                                src={product.imagUrl || "/placeholder.png"}
                                alt={product.ownerUsername}
                            />
                            <h3>{product.ownerUsername}</h3>
                            <p>${product.price}</p>
                            <button>Add to Cart</button>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
