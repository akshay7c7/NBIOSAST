using System.Collections.Generic;
using System.Threading.Tasks;
using NBI.API.Interfaces;
using NBI.API.Models;

namespace NBI.API.Repository
{
    public class DriverRepository : IDriverRepository
    {
        public void Add<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public Task<User> GetDriver(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<User>> GetDrivers()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveAll()
        {
            throw new System.NotImplementedException();
        }

        public void SendWhatsappMessage(string username, string body)
        {
            throw new System.NotImplementedException();
        }

        public void Update<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }
    }
}