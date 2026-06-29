import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportTransactionsPDF(transactions) {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ExpenseIQ Transactions", 14, 18);

    autoTable(doc, {
        startY: 30,
        head: [["Title", "Amount", "Type", "Category", "Date"]],
        body: transactions.map((t) => [
            t.title,
            `₹${t.amount}`,
            t.type,
            t.category,
            new Date(t.date).toLocaleDateString(),
        ]),
    });

    doc.save("ExpenseIQ_Report.pdf");
}