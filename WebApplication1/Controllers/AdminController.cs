using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult AnaSayfa()
        {
            return View();
        }
        public IActionResult KullaniciYönetimi()
        {
            return View();
        }
        public IActionResult TakimYönetimi()
        {
            return View();
        }
        public IActionResult OyuncuYönetimi()
        {
            return View();
        }
        public IActionResult EloHesaplamaları()
        {
            return View();
        }
    }
}
