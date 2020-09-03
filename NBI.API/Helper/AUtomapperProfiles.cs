using AutoMapper;
using NBI.API.Dtos;
using NBI.API.Models;

namespace NBI.API.Helper
{
    public class AUtomapperProfiles : Profile
    {
        public AUtomapperProfiles()
        {
            CreateMap<UserForCreateAdminDto, User>();
            CreateMap<UserForUpdateAdminDto, User>();
            CreateMap<User, UserForDisplayDetailDto>();
        }
    }
}