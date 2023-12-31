using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Northwind.Controllers
{
    public class APIController : Controller
    {
        // this controller depends on the NorthwindRepository
        private DataContext _dataContext;
        public APIController(DataContext db) => _dataContext = db;

        [HttpGet, Route("api/customer")]
        // returns all customers
        public IEnumerable<Customer> GetCustomer() => _dataContext.Customers;
        [HttpGet, Route("api/customer/{id}")]
        // returns specific customer
        public Customer GetCustomer(int id) => _dataContext.Customers.FirstOrDefault(p => p.CustomerId == id);
        
        [HttpGet, Route("api/employee")]
        // returns all employees
        public IEnumerable<Employee> GetEmployee() => _dataContext.Employees;
        [HttpGet, Route("api/employee/{id}")]
        // returns specific employee
        public Employee GetEmployee(int id) => _dataContext.Employees.FirstOrDefault(p => p.EmployeeId == id);

        [HttpGet, Route("api/product")]
        // returns all products
        public IEnumerable<Product> Get() => _dataContext.Products.OrderBy(p => p.ProductName);
        [HttpGet, Route("api/product/{id}")]
        // returns specific product
        public Product Get(int id) => _dataContext.Products.FirstOrDefault(p => p.ProductId == id);
        [HttpGet, Route("api/product/discontinued/{discontinued}")]
        // returns all products where discontinued = true/false
        public IEnumerable<Product> GetDiscontinued(bool discontinued) => _dataContext.Products.Where(p => p.Discontinued == discontinued).OrderBy(p => p.ProductName);
        [HttpGet, Route("api/category")]
        // returns all categories
         public IEnumerable<Category> GetCategory() => _dataContext.Categories.Include("Products").OrderBy(c => c.CategoryName);
        [HttpGet, Route("api/category/{CategoryId}/product")]
        // returns all products in a specific category
        public IEnumerable<Product> GetByCategory(int CategoryId) => _dataContext.Products.Where(p => p.CategoryId == CategoryId).OrderBy(p => p.ProductName);
                [HttpGet, Route("api/category/{CategoryId}/product/discontinued/{discontinued}")]
        // returns all products in a specific category where discontinued = true/false
        public IEnumerable<Product> GetByCategoryDiscontinued(int CategoryId, bool discontinued) => _dataContext.Products.Where(p => p.CategoryId == CategoryId && p.Discontinued == discontinued).OrderBy(p => p.ProductName);
                [HttpPost, Route("api/addtocart")]
        // adds a row to the cartitem table
        public CartItem Post([FromBody] CartItemJSON cartItem) => _dataContext.AddToCart(cartItem);
        [HttpGet, Route("api/order")]
        // returns all orders
        public IEnumerable<Order> GetOrder() => _dataContext.Orders.Include("Customer").Include("Employee").OrderBy(o => o.OrderId);
        [HttpGet, Route("api/order/{id}")]
        // returns specific orders
        public Order GetOrder(int id) => _dataContext.Orders.FirstOrDefault(o => o.OrderId == id);



    }
}