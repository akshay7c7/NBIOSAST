using System.Collections.Generic;

namespace NBI.API.HttoModels
{
    public class UsersWithRoles
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
    }
}