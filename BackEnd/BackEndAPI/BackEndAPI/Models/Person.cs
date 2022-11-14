using System.Diagnostics.CodeAnalysis;

namespace BackEndAPI.Models
{
    public class Person
    {
        public Guid Id { get; set; }

        public string Name { get; set; } 

        public string Surname { get; set; }

        public int ZipCode { get; set; }

        public string City { get; set; }

        public string PhoneNumber { get; set; }

    }
}
