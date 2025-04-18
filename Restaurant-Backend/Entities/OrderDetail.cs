using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents the detail of the order.
/// </summary>
[Table("OrderDetails")]
public class OrderDetail : EntityBase
{   

    public Guid OrderId { get; set; }
    public Order Order { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
