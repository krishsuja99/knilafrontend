using Knila_FrontEnd.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//We Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation(); // for page reload
builder.Services.AddDbContext<MyTestDBContext>(o => o.UseSqlServer("Server=L-ID-052;Database=MyTestDB;Trusted_Connection=True;encrypt=false;"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
