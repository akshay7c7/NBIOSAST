using System.ComponentModel.DataAnnotations;

namespace NBI.API.Dtos
{
    public class UserForUpdateAdminDto
    {
        public string Name         { get; set;}

        public string Email        { get; set;}

        public string PhoneNumber { get; set;}


    }
}