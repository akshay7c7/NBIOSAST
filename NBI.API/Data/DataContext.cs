using Microsoft.EntityFrameworkCore;
using NBI.API.Models;

namespace NBI.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}
        public DbSet<User> Users {get; set;}
        

    }
}