using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a order of the restaurant.
/// </summary>
[Table("Orders")]
public class Order : EntityBase
{   
    public Guid TableId { get; set; }
    public required Table Table { get; set; }
    public List<OrderDetail> ProductList { get; set; } = [];
    public OrderStatus Status { get; set; }
    public Guid TableSessionId { get; set; }
    public required TableSession TableSession { get; set; }

    [NotMapped]
    public decimal TotalAmountSum => ProductList.Sum(detail => detail.Quantity * detail.Product.Price);

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount {  get; set; }
}

public enum OrderStatus
{
    Confirmed,
    InKitchen,
    Ready,
    Served,
    Paid,
    Canceled
}