using System;

namespace NBI.API.Dtos
{
    public class DriverReturnDto
    {
        public string Name { get; set; }
        public string CertificateNo { get; set; }
        public string LicenseNo { get; set; }
        public string TransPortName { get; set; }
        public string TransPortAddress { get; set; }
        public string TransPortPhoneNo { get; set; }
        public string Address { get; set; }
        public string Amount { get; set; }
        public string PaymentType { get; set; }
        public int TrainingPeriod { get; set; }
        public DateTime DOB { get; set; }
        public DateTime TrainingStartDate { get; set; }
        public DateTime TrainingEndDate { get; set; }
        public string Photo { get; set; }
        public string OneDayDoc {get;set;}
        public string Document { get; set; }
    }
}