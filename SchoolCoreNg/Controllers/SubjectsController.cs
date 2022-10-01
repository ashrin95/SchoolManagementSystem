using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolCoreNg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolCoreNg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        SchoolDbContext _ctx = null;

        public SubjectsController()
        {
        }

        [HttpGet]
        public List<Subject> Get()
        {
            _ctx = new SchoolDbContext();
            return _ctx.Subjects.ToList();
        }

        [HttpPost]
        public Subject Post([FromBody] Subject teacher)
        {
            _ctx = new SchoolDbContext();
            _ctx.Subjects.Add(teacher);
            _ctx.SaveChanges();
            return teacher;
        }

        [HttpPut]
        public Subject Put([FromQuery] int id, [FromBody] Subject teacher)
        {
            _ctx = new SchoolDbContext();
            var oTeacher = _ctx.Subjects.Where(x => x.SubjectId == id).FirstOrDefault();
            if (oTeacher != null)
            {
                oTeacher.SubjectName = teacher.SubjectName;
                _ctx.SaveChanges();
            }
            return teacher;
        }

        [HttpDelete]
        public int Delete([FromQuery] int id)
        {
            _ctx = new SchoolDbContext();
            var oTeacher = _ctx.Subjects.Where(x => x.SubjectId == id).FirstOrDefault();
            if (oTeacher != null)
            {
                _ctx.Subjects.Remove(oTeacher);
                _ctx.SaveChanges();
            }
            return id;
        }
    }
}
