using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Mvc;
using NBI.API.Data;
using NBI.API.Dtos;
using NBI.API.Interfaces;
using NBI.API.Models;
using NBI.API.Repository;

namespace NBI.API.Controllers
{
    [Route("api/[controller]")]   //api/users
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAdminMaintainRepository _repo;
        
        private readonly IMapper _mapper;

        public UsersController(IAdminMaintainRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
           
        }
        [HttpGet("{id}", Name = "GetUser")]   // GET http://localhost:5000/api/users/2  ...   
        public async Task<IActionResult> GetUser(int id)
        {
            var userDetailsFromRepo = await _repo.GetUser(id);
            if(userDetailsFromRepo == null)
            {
                return NotFound("User not Found");
            }
            var userDetailsToShow = _mapper.Map<UserForDisplayDetailDto>(userDetailsFromRepo);
            return Ok(userDetailsToShow);

        }

        [HttpPut("{id}")]     // put http://localhost:5000/api/2
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateAdminDto userForUpdateAdminDto)
        {
            
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            byte[] PasswordHash, PasswordSalt;
            AuthRepository.CreatePasswordHash(userForUpdateAdminDto.Password, out PasswordHash, out PasswordSalt);
            userForUpdateAdminDto.PasswordHash = PasswordHash;
            userForUpdateAdminDto.PasswordSalt = PasswordSalt;

            var userFromrepo = await _repo.GetUser(id); 
            _mapper.Map(userForUpdateAdminDto, userFromrepo);

            if(await _repo.SaveAll()){
                return Ok("Profile updated successfully");
            }
            throw new System.Exception($"Updating user {id} failed on save");


        }


    }
}