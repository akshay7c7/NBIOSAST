using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace NBI.API.Models
{
    public class Driver
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; }
        public string CertificateNo { get; set; }
        public string LicenseNo { get; set; }
        public string TransPortName { get; set; }
        public string TransPortAddress { get; set; }
        public string TransPortPhoneNo { get; set; }
        public string Address { get; set; }
        public string Amount { get; set; }
        public string PaymentType { get; set; }
        public DateTime DOB { get; set; }
        public DateTime TrainingStartDate { get; set; }
        public DateTime TrainingEndDate { get; set; }
        public int TrainingPeriod { get; set; }
        public string Photo { get; set; }
        public string OneDayDoc {get;set;}
        public string Status { get; set; }
        
    }
}