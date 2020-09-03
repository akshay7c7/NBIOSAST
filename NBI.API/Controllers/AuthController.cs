using System.Linq;
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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DatingApp.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(IAuthRepository repo, 
                                IConfiguration config, 
                                IMapper mapper, 
                                SignInManager<User> signInManager,
                                UserManager<User> userManager)
        {
            _userManager = userManager;
            _repo = repo;
            _config = config;
            _mapper = mapper;
            _signInManager = signInManager;
        }

        [HttpPost("CreateAdmin")]
        public async Task<IActionResult> Register(UserForCreateAdminDto userForCreateAdminDto)
        {

            var userToCreate = _mapper.Map<User>(userForCreateAdminDto);
            var result = await _userManager.CreateAsync(userToCreate, userForCreateAdminDto.Password);
            var userToReturn = _mapper.Map<UserForDisplayDetailDto>(userToCreate);
            if(result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { Controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.UserName);
            var result = await _signInManager.CheckPasswordSignInAsync(user,userForLoginDto.Password , false);
            if(result.Succeeded)
            {
                var appUser = _userManager.Users.Where(u=>u.NormalizedUserName==userForLoginDto.UserName.ToUpper()).FirstOrDefault();
                var userToReturn = _mapper.Map<UserForDisplayDetailDto>(appUser);
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
            
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token =  tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}