using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Restaurant_Backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeValueOnTableEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Orders");

            migrationBuilder.Sql(
                "ALTER TABLE \"Tables\" ALTER COLUMN \"Number\" TYPE integer USING \"Number\"::integer;");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Tables",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Orders",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
