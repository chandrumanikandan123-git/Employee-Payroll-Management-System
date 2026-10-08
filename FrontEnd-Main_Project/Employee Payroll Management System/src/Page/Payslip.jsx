import React, { useState } from "react";
import axios from "axios";
import "./Payslip.css";

function Payslip() {

    const [payrollId, setPayrollId] = useState("");

    const downloadPayslip = async () => {

        if (payrollId === "") {
            alert("Please enter Payroll ID");
            return;
        }

        try {

            const response = await axios.get(
                `http://localhost:8080/api/payroll/${payrollId}/payslip`,
                {
                    responseType: "blob"
                }
            );

            const pdfBlob = new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

            const url = window.URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");

            link.href = url;

            link.download = `Payslip-${payrollId}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error("Payslip Error:", error);

            alert("Payslip download failed");

        }
    };

    return (

        <div className="payslip-page">

            <div className="payslip-container">

                <div className="payslip-icon">
                    📄
                </div>

                <h1 className="payslip-title">
                    Employee Payslip
                </h1>

                <p className="payslip-text">
                    Enter Payroll ID to download your payslip
                </p>

                <input
                    className="payslip-input"
                    type="number"
                    placeholder="Enter Payroll ID"
                    value={payrollId}
                    onChange={(e) =>
                        setPayrollId(e.target.value)
                    }
                />

                <button
                    className="payslip-download-btn"
                    onClick={downloadPayslip}
                >
                    Download Payslip PDF
                </button>

            </div>

        </div>

    );
}

export default Payslip;