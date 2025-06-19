using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Context;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using Restaurant_Backend.Models.Order;
using Restaurant_Backend.Models.OrderDetail;
using Restaurant_Backend.Models.Product;
using Restaurant_Backend.Models.Table;
using Restaurant_Backend.Models.TableSession;

namespace Restaurant_Backend.AutoMapperProfile;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        //Order
        CreateMap<OrderRequest, Order>()
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

        //Session
        CreateMap<TableSession, SessionResponse>()
            .ForMember(dest => dest.TableId, opt => opt.MapFrom(src => src.TableId))
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive))
            .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.EndTime))
            .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders));

        CreateMap<SessionRequest, TableSession>()
            .AfterMap<SessionRequestToTableSessionAction>();

        //User
        CreateMap<RegisterUserRequest, User>()
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
            .ForMember(dest => dest.LastLogin, opt => opt.Ignore());

        CreateMap<UpdateUserRequest, User>()
            .ForMember(dest => dest.LastLogin, opt => opt.Ignore());

    }
}
