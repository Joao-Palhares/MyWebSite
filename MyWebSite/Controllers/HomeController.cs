using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MyWebSite.Models;
using MyWebSite.Services;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace MyWebSite.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly YouTubeService _youTubeService;


        public HomeController(ILogger<HomeController> logger, YouTubeService youTubeService)
        {
            _logger = logger;
            _youTubeService = youTubeService;
        }


        public async Task<IActionResult> Index()
        {
            string channelId = "UCRb-EHkRutMzUOfi7tt8BNg"; // Example: Google Developers Channel
            string videoUrl = await _youTubeService.GetLatestVideoUrlAsync(channelId);

            ViewData["LatestVideoUrl"] = videoUrl; // Pass video URL to view

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
