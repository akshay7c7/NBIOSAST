using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using NBI.API.Data;
using NBI.API.Interfaces;
using NBI.API.Models;

namespace NBI.API.Repository
{
    public class AdminMaintainRepository : IAdminMaintainRepository
    {
        private readonly DataContext _context;
        public AdminMaintainRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

         public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
           var user = await _context.Users.Where(u=>u.Id==id).FirstOrDefaultAsync();
           return user;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        
    }
}