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
            CreateMap<DriverCreationDto, Driver>();
            CreateMap<Driver, DriverReturnData>();
            CreateMap<DriverCreationDto, DriverReturnData>();
            CreateMap<DriverReturnData, Driver>();
            CreateMap<DriverReturnData, DriverCreationDto>();
            CreateMap<DriverReturnData, DriverReturnDto>();
            CreateMap<DriverCreationDto, DriverReturnData>();
            CreateMap<DriverReturnFiles, DriverReturnDto>();
            CreateMap<DriverReturnFiles, Driver>();


        }
    }
}