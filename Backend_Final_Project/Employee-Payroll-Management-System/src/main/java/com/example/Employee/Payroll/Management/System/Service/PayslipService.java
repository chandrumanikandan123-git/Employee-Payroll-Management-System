package com.example.Employee.Payroll.Management.System.Service;

import java.io.ByteArrayOutputStream;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Employee.Payroll.Management.System.Entity.Employee;
import com.example.Employee.Payroll.Management.System.Entity.Payroll;
import com.example.Employee.Payroll.Management.System.Repository.PayrollRepository;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import com.itextpdf.layout.properties.TextAlignment;

@Service
public class PayslipService {

    private final PayrollRepository payrollRepository;

    public PayslipService(
            PayrollRepository payrollRepository) {

        this.payrollRepository = payrollRepository;
    }

    // ==========================================
    // GENERATE PAYSLIP PDF
    // ==========================================

    public byte[] generatePayslip(Long payrollId)
            throws Exception {

        // Find payroll
        Optional<Payroll> payrollOptional = payrollRepository.findById(payrollId);

        if (payrollOptional.isEmpty()) {

            throw new RuntimeException(
                    "Payroll ID " + payrollId + " not found");
        }

        Payroll payroll = payrollOptional.get();

        // Get employee
        Employee employee = payroll.getEmployee();

        // ==========================================
        // CREATE PDF IN MEMORY
        // ==========================================

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(outputStream);

        PdfDocument pdfDocument = new PdfDocument(writer);

        Document document = new Document(pdfDocument);

        // ==========================================
        // TITLE
        // ==========================================

        Paragraph title = new Paragraph(
                "EMPLOYEE PAYROLL MANAGEMENT SYSTEM");

        title.setBold();
        title.setFontSize(18);
        title.setTextAlignment(
                TextAlignment.CENTER);

        document.add(title);

        Paragraph payslipTitle = new Paragraph("SALARY PAYSLIP");

        payslipTitle.setBold();
        payslipTitle.setFontSize(16);
        payslipTitle.setTextAlignment(
                TextAlignment.CENTER);

        document.add(payslipTitle);

        document.add(
                new Paragraph("\n"));

        // ==========================================
        // EMPLOYEE DETAILS
        // ==========================================

        document.add(
                new Paragraph("Employee Details")
                        .setBold()
                        .setFontSize(13));

        Table employeeTable = new Table(
                new float[] { 150, 300 });

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph("Employee ID")));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph(
                                String.valueOf(
                                        employee.getId()))));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph("Employee Name")));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph(
                                employee.getName())));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph("Email")));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph(
                                employee.getEmail())));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph("Department")));

        employeeTable.addCell(
                new Cell().add(
                        new Paragraph(
                                employee.getDepartment())));

        document.add(employeeTable);

        document.add(
                new Paragraph("\n"));

        // ==========================================
        // PAYROLL DETAILS
        // ==========================================

        document.add(
                new Paragraph("Payroll Details")
                        .setBold()
                        .setFontSize(13));

        Table salaryTable = new Table(
                new float[] { 250, 200 });

        // Month
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Month")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                String.valueOf(
                                        payroll.getMonth()))));

        // Year
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Year")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                String.valueOf(
                                        payroll.getYear()))));

        // Basic Salary
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Basic Salary")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Rs. "
                                        + payroll.getBasicSalary())));

        // Allowances
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Allowances")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Rs. "
                                        + payroll.getAllowances())));

        // Gross Salary
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Gross Salary")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Rs. "
                                        + payroll.getGrossSalary())));

        // Deductions
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Deductions")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Rs. "
                                        + payroll.getDeductions())));

        // Net Salary
        salaryTable.addCell(
                new Cell().add(
                        new Paragraph("Net Salary")));

        salaryTable.addCell(
                new Cell().add(
                        new Paragraph(
                                "Rs. "
                                        + payroll.getNetSalary())));

        document.add(salaryTable);

        document.add(
                new Paragraph("\n"));

        // ==========================================
        // FOOTER
        // ==========================================

        Paragraph footer = new Paragraph(
                "This is a computer generated payslip.");

        footer.setTextAlignment(
                TextAlignment.CENTER);

        document.add(footer);

        // Close PDF
        document.close();

        return outputStream.toByteArray();
    }
}