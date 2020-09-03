using System.ComponentModel.DataAnnotations;
using System.Numerics;
namespace NBI.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }
       
        public byte[] PasswordHash { get; set; }
     
        public byte[] PasswordSalt { get; set; }
      
        public string Name { get; set; }

     
        public string Email { get; set; }

     
        public string Phone_number { get; set; }

      
        public string City { get; set; }

    }
}