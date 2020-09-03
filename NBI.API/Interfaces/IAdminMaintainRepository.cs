using System.Threading.Tasks;
using NBI.API.Models;

namespace NBI.API.Interfaces
{
    public interface IAdminMaintainRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        
        
    }
}