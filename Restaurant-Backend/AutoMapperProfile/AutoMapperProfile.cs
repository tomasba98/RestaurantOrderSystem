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
            .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => OrderStatus.Pending))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.ProductList, opt => opt.Ignore()) 
            .ForMember(dest => dest.Table, opt => opt.Ignore())       
            .ForMember(dest => dest.TableSession, opt => opt.Ignore());
        CreateMap<OrderDetailItem, OrderDetail>()
            .ForMember(dest => dest.OrderId, opt => opt.Ignore())
            .ForMember(dest => dest.Order, opt => opt.Ignore())
            .ForMember(dest => dest.Product, opt => opt.Ignore());
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
