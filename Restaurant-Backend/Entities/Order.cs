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
    public bool IsPaid { get; set; }
    public List<OrderDetail> ProductList { get; set; } = [];
    public OrderStatus Status { get; set; }
    public Guid TableSessionId { get; set; }
    public required TableSession TableSession { get; set; }

    [NotMapped]
    public decimal TotalAmount => ProductList.Sum(detail => detail.Quantity * detail.Product.Price);
    public decimal TotalAmountHistory {  get; set; }
}

public enum OrderStatus
{
    Pending,
    InKitchen,
    Ready,
    Served
}