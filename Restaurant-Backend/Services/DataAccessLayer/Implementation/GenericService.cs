using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Context;
using Restaurant_Backend.Entities;
using System.Linq.Expressions;

namespace Restaurant_Backend.Services.DataAccessLayer.Implementation;

public class GenericService<TEntity> : IGenericService<TEntity> where TEntity : EntityBase
{
    protected IGenericDao<TEntity> GenericDao;
    private readonly  DbContext _context;

    public GenericService(AppDbContext context)
    {
        _context = context;
        GenericDao = new GenericDao<TEntity>(context);
    }

    public async Task<TEntity?> GetByIdAsync(Guid entityId)
    {
        return await GenericDao
                        .Where(entity => entity.Id == entityId)
                        .FirstOrDefaultAsync();
    }
    public async Task<TEntity> GetAsync(TEntity entity)
    {
        return await GenericDao.GetAsync(entity);
    }

    public async Task InsertAsync(TEntity entity)
    {
        await GenericDao.InsertAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TEntity entity)
    {
        await GenericDao.DeleteAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TEntity entity)
    {
        await GenericDao.UpdateAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TEntity>> FindAllAsyncReadOnly()
    {
        return await GenericDao.FindAllAsyncReadOnly();
    }

    public IQueryable<TEntity> FilterByExpressionLinq(Expression<Func<TEntity, bool>> expression)
    {
        return GenericDao.Where(expression);
    }
}
