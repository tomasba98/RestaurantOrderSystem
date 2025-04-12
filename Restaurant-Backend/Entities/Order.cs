using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a order of the restaurant.
/// </summary>
[Table("Orders")]
public class Order : EntityBase
{
    public Guid TableId { get; set; }
    public Table Table { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsPaid { get; set; }
    public List<OrderDetail> Items { get; set; }
    public OrderStatus Status { get; set; }
}

public enum OrderStatus
{
    Pending,
    InKitchen,
    Ready,
    Served
}