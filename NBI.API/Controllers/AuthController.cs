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
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{   [AllowAnonymous]
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAdminMaintainRepository _repo;
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(  
                                IAdminMaintainRepository repo,
                                DataContext context,
                                IConfiguration config, 
                                IMapper mapper, 
                                SignInManager<User> signInManager,
                                UserManager<User> userManager)
                                 
        {
            _userManager = userManager;
            _repo = repo;
            _context = context;
            _config = config;
            _mapper = mapper;
            _signInManager = signInManager;
        }

        [Authorize(Roles = "AccountAdminCreater")]
        [HttpPost("CreateAccountAdmin")]
        public async Task<IActionResult> CreateAccountAdmin(UserForCreateAdminDto userForCreateAdminDto)
        {
            var checkuser = await _userManager.FindByNameAsync(userForCreateAdminDto.UserName);
            if(checkuser!=null)
            {
                return BadRequest("Username already exists");
            }
            var checkuseremail = await _userManager.FindByEmailAsync(userForCreateAdminDto.Email);
            if(checkuseremail!=null)
            {
                return BadRequest("Email already exists");
            }
            var userToCreate = _mapper.Map<User>(userForCreateAdminDto);
            var result = await _userManager.CreateAsync(userToCreate, userForCreateAdminDto.Password);
            var userToReturn = _mapper.Map<UserForDisplayDetailDto>(userToCreate);
            string[] rolesArray = {"DriverCreater","BranchAdminCreater"} ;
            if(result.Succeeded)
            {
                var userFromRepo = await _userManager.FindByNameAsync(userForCreateAdminDto.UserName);
                result = await _userManager.AddToRolesAsync(userFromRepo,rolesArray);
                if(!result.Succeeded)
                {
                    await _userManager.DeleteAsync(userFromRepo);
                    return BadRequest("Could not added roles, Please register again");
                }
                return CreatedAtRoute("GetUser", new { Controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
            
        }

        [HttpPost("CreateBranchAdmin")]
        public async Task<IActionResult> CreateBranchAdmin(UserForCreateAdminDto userForCreateAdminDto)
        {
            var checkuser = await _userManager.FindByNameAsync(userForCreateAdminDto.UserName);
            if(checkuser!=null)
            {
                return BadRequest("Username already exists");
            }
            var checkuseremail = await _userManager.FindByEmailAsync(userForCreateAdminDto.Email);
            if(checkuseremail!=null)
            {
                return BadRequest("Email already exists");
            }
            var userToCreate = _mapper.Map<User>(userForCreateAdminDto);
            var result = await _userManager.CreateAsync(userToCreate, userForCreateAdminDto.Password);
            var userToReturn = _mapper.Map<UserForDisplayDetailDto>(userToCreate);
            string[] rolesArray = {"DriverCreater"} ;
            if(result.Succeeded)
            {
                var userFromRepo = await _userManager.FindByNameAsync(userForCreateAdminDto.UserName);
                result = await _userManager.AddToRolesAsync(userFromRepo,rolesArray);
                if(!result.Succeeded)
                {
                    await _userManager.DeleteAsync(userFromRepo);
                    return BadRequest(result.Errors);
                }
                //_userManager.SendMailAsync("akshaychauhan227@gmail.com","akshay7c7@gmail.com","Welcome");
                return CreatedAtRoute("GetUser", new { Controller = "Users", id = userToCreate.Id }, userToReturn);
            }
            return BadRequest(result.Errors);
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.UserName);
            if (user==null)
            {
                return Unauthorized("Username not found !");
            }
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

            return Unauthorized("Incorrect Password !");
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role , role));
            }

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
            _repo.SendWhatsappMessage(user.Name ,"has logged in at");
            return tokenHandler.WriteToken(token);


        }
        
        [HttpPut("editPassword/{id}")]  // api/users/6/editpassword
        public async Task<IActionResult> PasswordChange(int id, PasswordChangeDto passwordChangeDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);
            userFromRepo.PasswordHash = _userManager.PasswordHasher
                                        .HashPassword(userFromRepo ,passwordChangeDto.Password);
            var result = await _userManager.UpdateAsync(userFromRepo);
            if(!result.Succeeded)
            {
                return BadRequest("Could Not Change Password");
            }
            await _repo.SaveAll();
            return Ok("Password reset successfully");

        }

        [HttpPost("logout/{id}")]

        public async Task<IActionResult> Logout(int id)
        {
            var userFromRepo = await _repo.GetUser(id);
            _repo.SendWhatsappMessage(userFromRepo.Name,"has logged out at");
            return Ok("Logged out successfully");
        }

        
    }
}