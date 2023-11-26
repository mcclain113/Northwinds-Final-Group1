using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

public class EmployeeController : Controller
{
    // this controller depends on the DataContext & the UserManager
    private DataContext _dataContext;
    private UserManager<AppUser> _userManager;
    public EmployeeController(DataContext db, UserManager<AppUser> usrMgr)
    {
        _dataContext = db;
        _userManager = usrMgr;
    }
    public IActionResult Register() => View();
    [HttpPost, ValidateAntiForgeryToken]
    public async System.Threading.Tasks.Task<IActionResult> Register(EmployeeWithPassword employeeWithPassword)
    {
        if (ModelState.IsValid)
        {
            Employee employee = employeeWithPassword.Employee;
          
                if (ModelState.IsValid)
                {
                    AppUser user = new AppUser
                    {
                        // email and username are synced - this is by choice
                        Email = employee.Email,
                        UserName = employee.Email
                    };
                    // Add user to Identity DB
                    IdentityResult result = await _userManager.CreateAsync(user, employeeWithPassword.Password);
                    if (!result.Succeeded)
                    {
                        AddErrorsFromResult(result);
                    }
                    else
                    {
                        // Assign user to employees Role
                        result = await _userManager.AddToRoleAsync(user, "northwind-employee");

                        if (!result.Succeeded)
                        {
                            // Delete User from Identity DB
                            await _userManager.DeleteAsync(user);
                            AddErrorsFromResult(result);
                        }
                        else
                        {
                            // Create employee (Northwind)
                            _dataContext.AddEmployee(employee);
                            return RedirectToAction("Index", "Home");
                        }
                    }
                }
            
        }
        return View();
    }
       [Authorize(Roles = "northwind-employee")]
    public IActionResult Account() => View(_dataContext.Employees.FirstOrDefault(c => c.Email == User.Identity.Name));
       [Authorize(Roles = "northwind-employee"), HttpPost, ValidateAntiForgeryToken]
    public IActionResult Account(Employee employee)
    {
        // Edit employee info
        _dataContext.EditEmployee(employee);
        return RedirectToAction("Index", "Home");
    }
    private void AddErrorsFromResult(IdentityResult result)
    {
        foreach (IdentityError error in result.Errors)
        {
            ModelState.AddModelError("", error.Description);
        }
    }
}