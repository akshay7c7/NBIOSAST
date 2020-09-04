using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using NBI.API.Data;
using NBI.API.Interfaces;
using NBI.API.Models;
using NBI.API.HttoModels;

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
           
           var user = await _context.Users.FirstOrDefaultAsync(x=>x.Id==id);
           return user;
        }
        public async Task<List<User>> GetUsers()
        {
           
           var user = await _context.Users.ToListAsync();
           return user;
        }

        public async Task<List<UsersWithRoles>> GetUsersWithRoles()
        {
        var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new  UsersWithRoles
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();
            return userList;
        }

        public async Task<UsersWithRoles> GetUserWithRole(int id)
        {
        var userList = await (from user in _context.Users where user.Id == id
                                  orderby user.UserName
                                  select new UsersWithRoles
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).FirstOrDefaultAsync();
            return userList;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        
    }
}