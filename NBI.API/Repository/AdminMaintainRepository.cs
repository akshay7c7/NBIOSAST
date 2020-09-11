using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using NBI.API.Data;
using NBI.API.Interfaces;
using NBI.API.Models;
using NBI.API.HttoModels;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Twilio;


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

        public async Task<User> GetUser(int id )
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

        public void SendWhatsappMessage(string username, string bodyHere)
        {
            TwilioClient.Init(
                "ACb252cc940bf685607e813059e7dd4ccb",
                "48800abfc7dae8aeb9c34b7af038d256"
            );

            var message =  MessageResource.Create(
                from :new PhoneNumber("whatsapp:+14155238886"),
                to : new PhoneNumber("whatsapp:+919000017307"),
                body: username + " "+ bodyHere + " "+DateTime.Now.ToString("dddd, dd MMMM") +" ,"+DateTime.Now.ToString("h:mm tt") 
            );

           
        }
    }
}