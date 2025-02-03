using System;
using System.Linq;
using System.Net.Http;
using System.ServiceModel.Syndication;
using System.Threading.Tasks;
using System.Xml;

namespace MyWebSite.Services
{
    public class YouTubeService
    {
        private readonly HttpClient _httpClient;

        public YouTubeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetLatestVideoUrlAsync(string channelId)
        {
            string rssUrl = $"https://www.youtube.com/feeds/videos.xml?channel_id={channelId}";

            try
            {
                using var response = await _httpClient.GetAsync(rssUrl);
                if (!response.IsSuccessStatusCode)
                    return null;

                var stream = await response.Content.ReadAsStreamAsync();
                using var reader = XmlReader.Create(stream);
                var feed = SyndicationFeed.Load(reader);

                var latestVideo = feed?.Items?.FirstOrDefault();
                if (latestVideo != null)
                {
                    string videoId = latestVideo.Id.Replace("yt:video:", ""); // Extract video ID
                    return $"https://www.youtube.com/embed/{videoId}";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching video: {ex.Message}");
            }

            return null;
        }
    }
}
