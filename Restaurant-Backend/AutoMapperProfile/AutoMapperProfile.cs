using AutoMapper;
using Restaurant_Backend.Entities;

using Restaurant_Backend.Models.Order;
using Restaurant_Backend.Models.OrderDetail;
using Restaurant_Backend.Models.Product;
using Restaurant_Backend.Models.Table;

namespace Restaurant_Backend.AutoMapperProfile;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        //Order
        CreateMap<OrderRequest, Order>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => OrderStatus.Pending))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
        CreateMap<OrderDetailRequest, OrderDetail>();
        CreateMap<Order, OrderResponse>();
        CreateMap<OrderDetail, OrderDetailResponse>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));


        //Product
        CreateMap<ProductRequest, Product>();
        CreateMap<Product, ProductResponse>();

        //Table
        CreateMap<TableRequest, Table>();
        CreateMap<Table, TableResponse>();

    }
}
