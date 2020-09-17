using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NBI.API.Migrations
{
    public partial class ExtendDriver : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Amount",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CertificateNo",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DOB",
                table: "Drivers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LicenseNo",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "OneDayDoc",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentType",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TrainingEndDate",
                table: "Drivers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "TrainingPeriod",
                table: "Drivers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "TrainingStartDate",
                table: "Drivers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TransPortAddress",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransPortName",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransPortPhoneNo",
                table: "Drivers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "CertificateNo",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "DOB",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "LicenseNo",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "OneDayDoc",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TrainingEndDate",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TrainingPeriod",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TrainingStartDate",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TransPortAddress",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TransPortName",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "TransPortPhoneNo",
                table: "Drivers");
        }
    }
}
