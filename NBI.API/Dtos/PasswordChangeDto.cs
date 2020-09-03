using System.ComponentModel.DataAnnotations;

namespace NBI.API.Dtos
{
    public class PasswordChangeDto
    {
        [Required]
        [StringLength(8,MinimumLength=4, ErrorMessage="Password length should be between 4 to 8 characters long")]
        public string Password { get; set; }
    }
}