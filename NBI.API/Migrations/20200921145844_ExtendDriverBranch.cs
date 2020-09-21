using Microsoft.EntityFrameworkCore.Migrations;

namespace NBI.API.Migrations
{
    public partial class ExtendDriverBranch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BranchVisited",
                table: "Drivers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BranchVisited",
                table: "Drivers");
        }
    }
}
