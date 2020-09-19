export interface Driver{
    Id :number,
    Name :string,
    Document : File,      
    CertificateNo : string,
    LicenseNo :string,
    TransPortName :string,
    TransPortAddress :string,
    TransPortPhoneNo :string,
    Address :string,
    Amount :string,
    PaymentType :string,
    DOB :Date,
    TrainingStartDate :Date,
    TrainingEndDate :Date,
    TrainingPeriod :number,
    Photo :string,             
    OneDayDoc: File    
}