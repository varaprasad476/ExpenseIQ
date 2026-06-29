import "./SummaryCard.css";

function SummaryCard({ title, amount, color }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <h2 style={{ color }}>{amount}</h2>
        </div>
    );
}

export default SummaryCard;