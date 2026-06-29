function SummaryCard({ title, amount, color }) {
    return (
        <div
            className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all
        p-6
        flex
        flex-col
        justify-center
      "
        >
            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <h2
                className="text-3xl font-bold mt-2"
                style={{ color }}
            >
                {amount}
            </h2>
        </div>
    );
}

export default SummaryCard;