using BackEndAPI.Data;
using BackEndAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEndAPI.Controllers
{
    [ApiController]
    [Route("/api/people")]
    public class PeopleController : Controller
    {
        private readonly BackEndAPIDbContext backEndAPIDbContext;

        public PeopleController(BackEndAPIDbContext backEndAPIDbContext)
        {
            this.backEndAPIDbContext = backEndAPIDbContext;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Person>>> GetAllPeople()
        {
            var people = await backEndAPIDbContext.People.ToListAsync();     //get's all people from the "people" table

            return Ok(people);
        }

        [HttpGet("{name}/{surname}")]
        public async Task<ActionResult<Person>> GetPersonByNameAndSurname(string name, string surname)
        {

            var person = await backEndAPIDbContext.People.SingleOrDefaultAsync(person => person.Name == name && person.Surname == surname);
            if (person == null)
                return BadRequest("Person not found");
            return Ok(person);
        }




        [HttpPost]

        public async Task<ActionResult<Person>> AddPerson([FromBody] Person personRequest)
        {
            var tempPerson = backEndAPIDbContext.People.SingleOrDefault(person => person.Name == personRequest.Name && person.Surname == personRequest.Surname && person.PhoneNumber == personRequest.PhoneNumber);
            
            if(tempPerson == null)
            {
                personRequest.Id = Guid.NewGuid();

                await backEndAPIDbContext.People.AddAsync(personRequest);
                await backEndAPIDbContext.SaveChangesAsync();

                return Ok(personRequest);
            }

            return BadRequest("Person already in database.");
        }
    }
}