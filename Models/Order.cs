using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    public int OrderId { get; set; }
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    public virtual Employee Employee { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? RequiredDate { get; set; }
    public DateTime? ShippedDate { get; set; }
    public int ShipVia { get; set; }
    [Column(TypeName = "decimal(18,4)")]
    public decimal Freight { get; set; }
    public string ShipName { get; set; }
    public string ShipAddress { get; set; }
    public string ShipCity { get; set; }
    public string ShipRegion { get; set; }
    public string ShipPostalCode { get; set; }
    public string ShipCountry { get; set; }
    [ForeignKey("Customer")]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }
    // public ICollection<Customer> Customers { get; set; }
    // public ICollection<Employee> Employees { get; set; }

}

