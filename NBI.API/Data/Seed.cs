using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using NBI.API.Models;
using Newtonsoft.Json;

namespace NBI.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "DriverCreater"},
                    new Role{Name = "BranchAdminCreater"},
                    new Role{Name = "AccountAdminCreater"},
                    
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "DriverCreater").Wait();
                }

                var SuperAdminUser = new User
                {
                    UserName = "Super1"
                };
                var AccountAdmin = new User
                {
                    UserName = "Account1"
                };
                var BranchAdmin = new User
                {
                    UserName = "Branch1"
                };

                IdentityResult result1 = userManager.CreateAsync(SuperAdminUser, "password").Result;
                IdentityResult result2 = userManager.CreateAsync(AccountAdmin, "password").Result;
                IdentityResult result3 = userManager.CreateAsync(BranchAdmin, "password").Result;
                

                if (result1.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Super1").Result;
                    userManager.AddToRolesAsync(admin, new[] {"DriverCreater","BranchAdminCreater","AccountAdminCreater"}).Wait();
                }
                if (result2.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Account1").Result;
                    userManager.AddToRolesAsync(admin, new[] {"DriverCreater","BranchAdminCreater"}).Wait();
                }
                if (result3.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Branch1").Result;
                    userManager.AddToRolesAsync(admin, new[] {"DriverCreater"}).Wait();
                }

            }
        }
    }
}