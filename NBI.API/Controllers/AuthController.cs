using System.Data;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using NBI.API.Data;
using NBI.API.Dtos;
using NBI.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using NBI.API.Interfaces;

namespace DatingApp.API.Controllers 
{
    [Route("api/[Controller]")]     
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("CreateAdmin")]
        public async Task<IActionResult> Register(UserForCreateAdminDto userForCreateAdminDto)
        {
            userForCreateAdminDto.UserName = userForCreateAdminDto.UserName.ToLower();
            if (await _repo.UserExists(userForCreateAdminDto.UserName))
                return BadRequest("Username already exists");
            var UserToCreate = _mapper.Map<User>(userForCreateAdminDto);
            var createdUser = await _repo.CreateAdmin(UserToCreate, userForCreateAdminDto.Password);
            var userToReturn = _mapper.Map<UserForDisplayDetailDto>(createdUser);
            return CreatedAtRoute("GetUser",new {Controller="Users",id = createdUser.Id}, userToReturn);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto )
        {
            var userFromRepo = await _repo.Login(userForLoginDto.UserName, userForLoginDto.Password);
            if (userFromRepo==null)
            {   
                return Unauthorized();
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForDisplayDetailDto>(userFromRepo);

            return Ok( 
                new { 
                    token = tokenHandler.WriteToken(token),
                    user
                    });
        }
    }
}