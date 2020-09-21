using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NBI.API.Data;
using NBI.API.Dtos;
using NBI.API.Models;

namespace NBI.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DriverController : ControllerBase
    {
        private readonly IMapper _mapper;
        public DataContext _context { get; }
        public DriverController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("AddDriver")]
        public async Task<IActionResult> AddDriver([FromForm]DriverCreationDto driverDto)
        {
                DriverReturnFiles driverFilesDto = new DriverReturnFiles();
                
                if(driverDto.Document!=null)
                {
                     using(var ms = new MemoryStream())
                    {
                        driverDto.Document.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        driverFilesDto.Document = Convert.ToBase64String(fileBytes);
                    }
                }
                
                if(driverDto.OneDayDoc!=null)
                {
                    using (var ms1 = new MemoryStream())
                    {
                        driverDto.OneDayDoc.CopyTo(ms1);
                        var fileBytes = ms1.ToArray();
                        driverFilesDto.OneDayDoc = Convert.ToBase64String(fileBytes);

                    }
                }

                if(driverDto.Photo!=null)
                {
                    using(var ms2 = new MemoryStream())
                    {
                        driverDto.Photo.CopyTo(ms2);
                        var fileBytes = ms2.ToArray();
                        driverFilesDto.Photo = Convert.ToBase64String(fileBytes);
                    }                    
                }

                var drivertoSave = _mapper.Map<DriverReturnData>(driverDto);
                var drivertoSave2 = _mapper.Map<Driver>(driverFilesDto);
                var driverToCreate = _mapper.Map(drivertoSave, drivertoSave2);

                await _context.AddAsync(driverToCreate);
                await _context.SaveChangesAsync();
                return Ok(new{message = "Created Successfully"});
        
        }

        [HttpGet("getdriver/{id}")]
        public async Task<IActionResult> GetDriver(int id)
        {
              var driverFromRepo = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
              return Ok(driverFromRepo);
        }

        [HttpGet("getAlldrivers")]
        public async Task<IActionResult> GetAllDrivers()
        {
              var driver  = await _context.Drivers.OrderByDescending(x=>x.Status=="Pending").ToListAsync();
              var driverListToReturn = _mapper.Map<List<DriverReturnDto>>(driver);
              return Ok(driverListToReturn);
        }
        [HttpDelete("DeleteDriver/{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driverToDelete = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            _context.Drivers.Remove(driverToDelete);
            return Ok(new {message = "Deleted Successfully"});
        }

        [HttpPut("UpdateDriver/{id}")]
        public async Task<IActionResult> EditDriver(int id, [FromForm]DriverCreationDto driverDto)
        {
            var driverFromRepo = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            if(driverFromRepo.Status=="Approved")
            {
                return BadRequest("You cannot edit an approved License");
            }

            DriverReturnFiles driverFilesInString = new DriverReturnFiles();
                
                if(driverDto.Document!=null)
                {
                     using(var ms = new MemoryStream())
                    {
                        driverDto.Document.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        driverFilesInString.Document = Convert.ToBase64String(fileBytes);
                    }
                }
                
                if(driverDto.OneDayDoc!=null)
                {
                    using (var ms1 = new MemoryStream())
                    {
                        driverDto.OneDayDoc.CopyTo(ms1);
                        var fileBytes = ms1.ToArray();
                        driverFilesInString.OneDayDoc = Convert.ToBase64String(fileBytes);

                    }
                }

                if(driverDto.Photo!=null)
                {
                    using(var ms2 = new MemoryStream())
                    {
                        driverDto.Photo.CopyTo(ms2);
                        var fileBytes = ms2.ToArray();
                        driverFilesInString.Photo = Convert.ToBase64String(fileBytes);
                    }                    
                }

                

                var driverNormalData = _mapper.Map<DriverReturnData>(driverDto);
                var driverFilesData  = _mapper.Map<Driver>(driverFilesInString);
                driverFilesData.Id = driverFromRepo.Id;
                var driverToUpdate   = _mapper.Map(driverNormalData, driverFilesData);
                var dataToReturn = _mapper.Map(driverToUpdate, driverFromRepo);
                if(await _context.SaveChangesAsync()>0)
                {
                    return Ok(dataToReturn);
                }
                return BadRequest("Update failed");
                
        }

        [HttpPut("Approve/{id}")]
        public async Task<IActionResult> ApproveDriver(int id)
        {
            var driverToDelete = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            await _context.Drivers.Where(x=>x.Id==id).ForEachAsync(z=>z.Status="Approved");
            await _context.SaveChangesAsync();
            return Ok(new {message = "Status changed to "+driverToDelete.Status+" for "+driverToDelete.Name});
        }

        [HttpPut("PutOnPending/{id}")]
        public async Task<IActionResult> PutOnPending(int id)
        {
            var driverToDelete = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            await _context.Drivers.Where(x=>x.Id==id).ForEachAsync(z=>z.Status="Pending");
            await _context.SaveChangesAsync();
            return Ok(new {message = "Status changed to "+driverToDelete.Status+" for "+driverToDelete.Name});
        }

        


    }
}