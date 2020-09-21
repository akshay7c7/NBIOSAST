using System;

namespace NBI.API.Dtos
{
    public class DriverReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; } 
        public string Photo { get; set; }
        public string Status { get; set; }
    }
}