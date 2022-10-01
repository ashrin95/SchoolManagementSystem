using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SchoolCoreNg.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolCoreNg.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        SchoolDbContext _ctx = null;

        public TeachersController()
        {
        }

        [HttpGet]
        public List<Teacher> Get()
        {
            _ctx = new SchoolDbContext();
            return _ctx.Teachers.ToList();
        }

        [HttpPost]
        public Teacher Post([FromBody] Teacher teacher)
        {
            _ctx = new SchoolDbContext();
            _ctx.Teachers.Add(teacher);
            _ctx.SaveChanges();
            return teacher;
        }

        [HttpPut]
        public Teacher Put([FromQuery] int id, [FromBody] Teacher teacher)
        {
            _ctx = new SchoolDbContext();
            var oTeacher = _ctx.Teachers.Where(x => x.TeacherId == id).FirstOrDefault();
            if (oTeacher != null)
            {
                oTeacher.TeacherName = teacher.TeacherName;
                _ctx.SaveChanges();
            }
            return teacher;
        }

        [HttpDelete]
        public int Delete([FromQuery] int id)
        {
            _ctx = new SchoolDbContext();
            var oTeacher = _ctx.Teachers.Where(x => x.TeacherId == id).FirstOrDefault();
            if (oTeacher != null)
            {
                _ctx.Teachers.Remove(oTeacher);
                _ctx.SaveChanges();
            }
            return id;
        }

    }
}
