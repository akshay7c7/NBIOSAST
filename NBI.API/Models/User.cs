using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using Microsoft.AspNetCore.Identity;

namespace NBI.API.Models
{
    public class User : IdentityUser<int>
    {
     
      
        public string Name { get; set; }
      
        public string City { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
        

    }
}