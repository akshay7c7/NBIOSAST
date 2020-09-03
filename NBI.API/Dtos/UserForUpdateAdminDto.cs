using System.ComponentModel.DataAnnotations;

namespace NBI.API.Dtos
{
    public class UserForUpdateAdminDto
    {
        public string Name         { get; set;}

        public string Email        { get; set;}

        public string PhoneNumber { get; set;}

        [StringLength(8,MinimumLength=4, ErrorMessage="Password length should be between 4 to 8 characters long")]
        public string Password { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}