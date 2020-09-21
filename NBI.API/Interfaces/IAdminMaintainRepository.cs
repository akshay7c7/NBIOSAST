using System.Collections.Generic;
using System.Threading.Tasks;
using NBI.API.Dtos;
using NBI.API.HttoModels;
using NBI.API.Models;

namespace NBI.API.Interfaces
{
    public interface IAdminMaintainRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<List<UserForDisplayDetailDto>> GetUsers();
        Task<List<UsersWithRoles>> GetUsersWithRoles();
        Task<UsersWithRoles> GetUserWithRole(int id);
        void SendWhatsappMessage(string username, string body);
        
        
    }
}