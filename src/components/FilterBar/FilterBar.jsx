import "./FilterBar.css";

function FilterBar({ filter, setFilter }) {
    return (
        <div className="filter-bar">
            <button
                className={filter === "All" ? "active" : ""}
                onClick={() => setFilter("All")}
            >
                All
            </button>

            <button
                className={filter === "Income" ? "active" : ""}
                onClick={() => setFilter("Income")}
            >
                Income
            </button>

            <button
                className={filter === "Expense" ? "active" : ""}
                onClick={() => setFilter("Expense")}
            >
                Expense
            </button>
        </div>
    );
}

export default FilterBar;