using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public UsersController(IAdminMaintainRepository repo, IMapper mapper, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;

        }
        [HttpGet("{id}", Name = "GetUser")]   // GET http://localhost:5000/api/users/2  ...   
        public async Task<IActionResult> GetUser(int id)
        {
            var userDetailsFromRepo = await _repo.GetUser(id);
            if (userDetailsFromRepo == null)
            {
                return NotFound("User not Found");
            }
            var userDetailsToShow = _mapper.Map<UserForDisplayDetailDto>(userDetailsFromRepo);
            return Ok(userDetailsToShow);

        }

        [HttpPut("{id}")]     // put http://localhost:5000/api/2
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateAdminDto userForUpdateAdminDto)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateAdminDto, userFromRepo);
            

            if (await _repo.SaveAll()){

                var userToReturn = _mapper.Map<UserForDisplayDetailDto>(userFromRepo);
                return CreatedAtRoute("GetUser", new { Controller = "Users", id = userFromRepo.Id }, userToReturn);

            }
                
            return BadRequest($"Changes not made for {id} ");

        }

        [HttpPut("{id}/editPassword")]  // api/users/6/editpassword
        public async Task<IActionResult> PasswordChange(int id, PasswordChangeDto passwordChangeDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);
            userFromRepo.PasswordHash = _userManager.PasswordHasher.HashPassword(userFromRepo ,passwordChangeDto.Password);
            var result = await _userManager.UpdateAsync(userFromRepo);
            if(!result.Succeeded)
            {
                return BadRequest("Could Not Change Password");
            }
            await _repo.SaveAll();
            return Ok("Password reset successfully");

        }


    }
}