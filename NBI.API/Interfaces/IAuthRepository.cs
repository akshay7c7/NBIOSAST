using System.Threading.Tasks;
using NBI.API.Models;

namespace NBI.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> CreateAdmin(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    } 
   
}