using Microsoft.AspNetCore.Mvc;

public class OrderController : Controller
{
  
  private DataContext _dataContext;
  public OrderController(DataContext db) => _dataContext = db;
  public IActionResult OrderView() => View(_dataContext.Orders.OrderBy(o => o.RequiredDate));

  
     public IActionResult Index(int id){
    ViewBag.id = id;
    return View(_dataContext.Categories.OrderBy(c => c.CategoryName));
  }



}
