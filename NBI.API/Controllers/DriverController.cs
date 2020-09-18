using System.Reflection.Metadata;
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
                System.Console.WriteLine(driverDto.Photo.Length);
                System.Console.WriteLine(driverDto.Document.Length);
                System.Console.WriteLine(Request.Form.Files.Count);
                var reqFile1 = Request.Form.Files;
                DriverReturnFiles driverFilesDto = new DriverReturnFiles();
                
                using(var ms = new MemoryStream())
                {
                    driverDto.Document.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    driverFilesDto.Document = Convert.ToBase64String(fileBytes);

                    
                }
                using (var ms1 = new MemoryStream())
                {
                    driverDto.OneDayDoc.CopyTo(ms1);
                    var fileBytes = ms1.ToArray();
                    driverFilesDto.OneDayDoc = Convert.ToBase64String(fileBytes);

                }
                using(var ms2 = new MemoryStream())
                {
                    driverDto.Photo.CopyTo(ms2);
                    var fileBytes = ms2.ToArray();
                    driverFilesDto.Photo = Convert.ToBase64String(fileBytes);
                }
                   
                var drivertoSave = _mapper.Map<DriverReturnData>(driverDto);
                var drivertoSave2 = _mapper.Map<Driver>(driverFilesDto);
                var driverToCreate = _mapper.Map(drivertoSave, drivertoSave2 );

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
        public async Task<IActionResult> GetAllDrivers(int id)
        {
              var driver = await _context.Drivers.ToListAsync();
              //var driverToReturn = _mapper.Map<List<DriverReturnDto>>(driver);
              return Ok(driver);
        }
    }
}