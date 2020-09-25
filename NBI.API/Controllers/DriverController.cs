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
using NBI.API.Helper;

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

        [HttpGet("getAlldrivers/{branchName}")]
        public async Task<IActionResult> GetAllDrivers(string branchName)
        {   
            if(branchName=="ALL")
            {
            System.Console.WriteLine("inside"+branchName);
            var driver  = await _context.Drivers.OrderByDescending(s=>s.Status=="Pending").ThenByDescending(x=>x.Id).ToListAsync();
            var driverListToReturn = _mapper.Map<List<DriverReturnDto>>(driver);
            return Ok(driverListToReturn); 
            }

            System.Console.WriteLine("outside"+branchName);
            var driverF  = await _context.Drivers.Where(s=>s.Status=="Approved" && s.BranchVisited==branchName).OrderByDescending(x=>x.Id).ToListAsync();
            var driverListToReturnF = _mapper.Map<List<DriverReturnDto>>(driverF);
            return Ok(driverListToReturnF);
        }
        [HttpDelete("DeleteDriver/{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var driverToDelete = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            _context.Drivers.Remove(driverToDelete);
           await _context.SaveChangesAsync();
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

        [HttpPut("RecordPrint/{id}")]
         public async Task<IActionResult> RecordPrint(int id)
        {
            var driverToPrint = await _context.Drivers.FirstOrDefaultAsync(x=>x.Id==id);
            await _context.Drivers.Where(x=>x.Id==id).ForEachAsync(z=>z.PrintTime=DateTime.Today);
            await _context.SaveChangesAsync();
            return Ok(new {message = "Status changed to "+driverToPrint.PrintTime+" for "+driverToPrint.Name});
        }


        [HttpGet("TodayData")]
        public async Task<IActionResult> GetTodaysData()
        {
            Dashboard dash = new Dashboard();
            
            dash.TodayDrivers = await _context.Drivers.Where(x=>x.Created == DateTime.Today).CountAsync();
            var TotalAmount = await _context.Drivers.Where(x=>x.Created == DateTime.Today)
                                    .Select(x=>x.Amount).ToListAsync();
            dash.TodayAmount = TotalAmount.Sum(x=>x);
            dash.TodayPrints = await _context.Drivers.Where(x=>x.PrintTime == DateTime.Today).CountAsync();

            var weekdate = DateTime.Now.StartOfWeek(DayOfWeek.Monday);

            var WeekDrivers = await  _context.Drivers.Where(x=> x.Created >= weekdate)
                                    .ToListAsync();
            dash.WeekDrivers = WeekDrivers.Count();
            var WeekAmount = await _context.Drivers.Where(x=> x.Created >= weekdate).Select(x=>x.Amount).ToListAsync();
            dash.WeekAmount = WeekAmount.Sum(x=>x);
            dash.WeekPrints = await _context.Drivers.Where(x=> x.PrintTime >= weekdate)
                                    .CountAsync();


            dash.AnnualDrivers = await _context.Drivers.CountAsync();
            var AnnualAmount = await _context.Drivers.Select(x=>x.Amount).ToListAsync();
            dash.AnnualAmount = AnnualAmount.Sum(x=>x);
            dash.AnnualPrints = await _context.Drivers.Where(x=>x.PrintTime != new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)).CountAsync();
            
            return Ok(dash);
        }




        


    }
}