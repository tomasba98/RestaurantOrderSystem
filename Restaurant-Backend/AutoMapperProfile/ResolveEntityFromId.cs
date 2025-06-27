using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Context;

namespace Restaurant_Backend.AutoMapperProfile;


public static class MappingContextExtensions
{
    public static void ResolveEntity<TSource, TDestination, TEntity>(
        this ResolutionContext context,
        TSource source,
        TDestination destination,
        Func<TSource, object> idSelector,
        Action<TDestination, TEntity> setEntity,
        Action<TDestination, object> setEntityId,
        AppDbContext db) 
        where TEntity : class
    {
        var id = idSelector(source);
        var entity = db.Find(typeof(TEntity), id) as TEntity
                   ?? throw new Exception($"{typeof(TEntity).Name} not found for ID {id}");

        setEntity(destination, entity);
        setEntityId(destination, id);

        db.Entry(entity).State = EntityState.Unchanged;
    }
}


