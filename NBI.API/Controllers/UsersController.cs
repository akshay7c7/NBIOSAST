using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NBI.API.Data;
using NBI.API.Dtos;
using NBI.API.Interfaces;
using NBI.API.Models;
using NBI.API.Repository;

namespace NBI.API.Controllers
{
    [Route("api/[controller]")]   
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

        [Authorize(Roles="DriverCreater,BranchAdminCreater,AccountAdminCreater")]
        [HttpGet("{id}", Name = "GetUser")]    
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

        [Authorize(Roles="BranchAdminCreater,AccountAdminCreater")]
        [HttpGet(Name = "GetUsers")]    
        public async Task<IActionResult> GetUsers()
        {
            var userDetailsFromRepo = await _repo.GetUsers();
            if (userDetailsFromRepo == null)
            {
                return NotFound("User not Found");
            }
            //var userDetailsToShow = _mapper.Map<List<UserForDisplayDetailDto>>(userDetailsFromRepo);
            return Ok(userDetailsFromRepo);

        }

        [Authorize(Roles="DriverCreater,BranchAdminCreater,AccountAdminCreater")]
        [HttpPut("{id}")]    
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateAdminDto userForUpdateAdminDto)
        {
            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateAdminDto, userFromRepo);
            
            if (await  _repo.SaveAll()){

                var userToReturn = _mapper.Map<UserForDisplayDetailDto>(userFromRepo);
                return CreatedAtRoute("GetUser", new { Controller = "Users", id = userFromRepo.Id }, userToReturn);

            }
            return BadRequest($"Changes not made for {id} ");
        }

        [Authorize(Roles="DriverCreater,BranchAdminCreater,AccountAdminCreater")]
        [HttpGet("usersWithRoles", Name = "GetUsersWithRoles")]
        public async Task<IActionResult> GetUsersWithRolesHttp()
        {
            var users = await _repo.GetUsersWithRoles();
            return Ok(users);
            
        }


        [Authorize(Roles="DriverCreater,BranchAdminCreater,AccountAdminCreater")]
        [HttpGet("userWithRole/{id}", Name = "GetUserWithRole")]
        public async Task<IActionResult> GetUserWithRoleHttp(int id)
        {
            var users = await _repo.GetUserWithRole(id);
            return Ok(users);
        }
    }
}