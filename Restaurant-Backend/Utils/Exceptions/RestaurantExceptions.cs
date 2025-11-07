namespace Restaurant_Backend.Utils.Exceptions;

public class RestaurantExceptions
{

}
public class OrderNotFoundException : Exception
{
    public OrderNotFoundException(Guid orderId)
        : base($"Order with ID {orderId} was not found.") { }
}

public class OrderNotPaidException : Exception
{
    public OrderNotPaidException(Guid orderId)
        : base($"Cannot delete unpaid order with ID {orderId}.") { }
}
