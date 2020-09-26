namespace NBI.API.Dtos
{
    public class Dashboard
    {
        public int TodayDrivers { get; set; }
        public int TodayAmount { get; set; }
        public int TodayPrints { get; set; }
        public int WeekDrivers { get; set; }
        public int WeekAmount { get; set; }
        public int WeekPrints { get; set; }

        public int AnnualDrivers { get; set; }
        public int AnnualAmount { get; set; }
        public int AnnualPrints { get; set; }
    }
}