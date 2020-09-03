using System.ComponentModel.DataAnnotations;

namespace NBI.API.Dtos
{
    public class UserForCreateAdminDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4, ErrorMessage="Password length should be between 4 to 8 characters long")]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string City { get; set; }
        
    }
}