using Practice1.data.model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Practice1.data;

namespace Practice1.data
{
    public static class Seeder
    {
        private static string Admin;
        private static string User;

        public static void Seed
            (ApplicationDbContext db,
            bool roles = true,
            bool users = true,
            bool userRoles = true)
        {
            if (roles) seedroles(db);
            if (users) seedusers(db);
            User = db.Users.FirstOrDefault(x => x.UserName == "user@test.com").Id;
            seedUserRoles(Admin, User, db);
        }

        private static void seedroles(ApplicationDbContext db)
        {
            var store = new RoleStore<IdentityRole>(db);
            var manager = new RoleManager<IdentityRole>(store);
            {
                if (!manager.RoleExists(Roles.ADMIN))
                {
                    manager.Create(new IdentityRole() { Name = Roles.ADMIN });
                }
                if (!manager.RoleExists(Roles.USER))
                {
                    manager.Create(new IdentityRole() { Name = Roles.USER });
                }
            }
        }
        private static void seedusers(ApplicationDbContext db)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));

            if (!db.Users.Any(x => x.UserName == "user@test.com"))
            {
                ApplicationUser user = new ApplicationUser()
                {
                    Email = "user@test.com",
                    UserName = "user@test.com",
                };
                manager.Create(user, "user123!@#");
            }
            db.SaveChanges();
        }
        private static void seedUserRoles(string Admin, string User, ApplicationDbContext db)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));

            manager.AddToRoles(Admin, Roles.ADMIN);
            manager.AddToRole(User, Roles.USER);
        }
    }
}


