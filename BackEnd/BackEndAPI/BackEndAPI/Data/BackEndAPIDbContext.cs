using BackEndAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEndAPI.Data
{
    public class BackEndAPIDbContext : DbContext
    {
        public BackEndAPIDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Person> People { get; set; }
    }
}
