using Microsoft.EntityFrameworkCore.Migrations;

namespace NBI.API.Migrations
{
    public partial class DriverStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Drivers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Drivers");
        }
    }
}
