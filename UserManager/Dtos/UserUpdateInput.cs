using System.ComponentModel.DataAnnotations;

namespace UserManager.Dtos
{
    public class UserUpdateInput
    {
        [Required]
        public string Nombres { get; set; }
        [Required]
        public string Apellidos { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Estado { get; set; }
    }
}
