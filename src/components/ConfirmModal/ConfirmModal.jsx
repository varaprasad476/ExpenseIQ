import "./ConfirmModal.css";

function ConfirmModal({
    isOpen,
    transactionTitle,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>🗑 Delete Transaction</h2>

                <p>
                    Are you sure you want to delete{" "}
                    <strong>"{transactionTitle}"</strong>?
                </p>

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>

                    <button className="confirm-btn" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;